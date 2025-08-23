
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface QuoteData {
  reservation_id: string;
  title: string;
  description?: string;
  items: QuoteItem[];
  validity_days?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const quoteData: QuoteData = await req.json();
    console.log("Generating quote:", quoteData);

    // Verify reservation exists and user is the artisan
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .select(`
        *,
        artisan_profiles!inner(user_id),
        client:profiles!client_id(first_name, last_name, email)
      `)
      .eq("id", quoteData.reservation_id)
      .single();

    if (reservationError || !reservation) {
      throw new Error("Reservation not found");
    }

    if (reservation.artisan_profiles.user_id !== user.id) {
      throw new Error("You are not authorized to create a quote for this reservation");
    }

    // Calculate totals
    const subtotal = quoteData.items.reduce((sum, item) => sum + item.total, 0);
    const taxRate = 0.20; // 20% VAT
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    // Set expiration date
    const validityDays = quoteData.validity_days || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validityDays);

    // Create quote
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .insert({
        reservation_id: quoteData.reservation_id,
        artisan_id: reservation.artisan_id,
        client_id: reservation.client_id,
        title: quoteData.title,
        description: quoteData.description,
        items: quoteData.items,
        subtotal,
        tax_rate: taxRate,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        validity_days: validityDays,
        expires_at: expiresAt.toISOString(),
        status: "draft"
      })
      .select()
      .single();

    if (quoteError) {
      console.error("Error creating quote:", quoteError);
      throw quoteError;
    }

    // Update reservation with estimated price
    await supabase
      .from("reservations")
      .update({ estimated_price: totalAmount })
      .eq("id", quoteData.reservation_id);

    // Send message to client about new quote
    const { data: thread } = await supabase
      .from("message_threads")
      .select("id")
      .eq("reservation_id", quoteData.reservation_id)
      .single();

    if (thread) {
      await supabase
        .from("messages")
        .insert({
          thread_id: thread.id,
          sender_id: user.id,
          content: `Un nouveau devis a été créé pour votre demande.\n\nTitre: ${quoteData.title}\nMontant total: ${totalAmount.toFixed(2)}€ TTC\nValidité: ${validityDays} jours\n\nVous pouvez consulter et accepter le devis dans votre espace client.`,
          message_type: "quote_update"
        });
    }

    console.log(`Quote created successfully: ${quote.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        quote,
        message: "Devis créé avec succès"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in generate-quote function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
