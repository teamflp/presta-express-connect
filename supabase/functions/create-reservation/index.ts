
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationData {
  artisan_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  postal_code: string;
  city: string;
  description?: string;
  is_emergency?: boolean;
  latitude?: number;
  longitude?: number;
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

    const reservationData: ReservationData = await req.json();
    console.log("Creating reservation:", reservationData);

    // Verify artisan exists and is verified
    const { data: artisan, error: artisanError } = await supabase
      .from("artisan_profiles")
      .select("*")
      .eq("id", reservationData.artisan_id)
      .eq("is_verified", true)
      .single();

    if (artisanError || !artisan) {
      throw new Error("Artisan not found or not verified");
    }

    // Verify service exists and belongs to artisan
    const { data: service, error: serviceError } = await supabase
      .from("artisan_services")
      .select("*")
      .eq("id", reservationData.service_id)
      .eq("artisan_id", reservationData.artisan_id)
      .eq("is_active", true)
      .single();

    if (serviceError || !service) {
      throw new Error("Service not found or not available");
    }

    // Check availability
    const reservationDate = new Date(reservationData.scheduled_date);
    const dayOfWeek = reservationDate.getDay();
    
    const { data: availabilitySlots, error: availabilityError } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("artisan_id", reservationData.artisan_id)
      .eq("day_of_week", dayOfWeek)
      .eq("is_available", true)
      .lte("start_time", reservationData.scheduled_time)
      .gte("end_time", reservationData.scheduled_time);

    if (availabilityError || !availabilitySlots || availabilitySlots.length === 0) {
      throw new Error("Artisan not available at this time");
    }

    // Check for booking exceptions
    const { data: exceptions, error: exceptionsError } = await supabase
      .from("booking_exceptions")
      .select("*")
      .eq("artisan_id", reservationData.artisan_id)
      .eq("exception_date", reservationData.scheduled_date)
      .eq("exception_type", "unavailable");

    if (exceptionsError) {
      console.error("Error checking exceptions:", exceptionsError);
    }

    if (exceptions && exceptions.length > 0) {
      throw new Error("Artisan is not available on this date");
    }

    // Check for conflicting reservations
    const { data: conflicts, error: conflictsError } = await supabase
      .from("reservations")
      .select("*")
      .eq("artisan_id", reservationData.artisan_id)
      .eq("scheduled_date", reservationData.scheduled_date)
      .eq("scheduled_time", reservationData.scheduled_time)
      .in("status", ["pending", "confirmed", "in_progress"]);

    if (conflicts && conflicts.length > 0) {
      throw new Error("This time slot is already booked");
    }

    // Calculate estimated price
    let estimatedPrice = service.base_price || 0;
    if (reservationData.is_emergency) {
      estimatedPrice *= 1.5; // 50% emergency surcharge
    }

    // Create location point if coordinates provided
    let location = null;
    if (reservationData.latitude && reservationData.longitude) {
      location = `POINT(${reservationData.longitude} ${reservationData.latitude})`;
    }

    // Create reservation
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .insert({
        client_id: user.id,
        artisan_id: reservationData.artisan_id,
        service_id: reservationData.service_id,
        scheduled_date: reservationData.scheduled_date,
        scheduled_time: reservationData.scheduled_time,
        address: reservationData.address,
        postal_code: reservationData.postal_code,
        city: reservationData.city,
        description: reservationData.description,
        estimated_price: estimatedPrice,
        is_emergency: reservationData.is_emergency || false,
        location: location,
        status: "pending"
      })
      .select()
      .single();

    if (reservationError) {
      console.error("Error creating reservation:", reservationError);
      throw reservationError;
    }

    // Create message thread
    const { data: thread, error: threadError } = await supabase
      .from("message_threads")
      .insert({
        client_id: user.id,
        artisan_id: reservationData.artisan_id,
        reservation_id: reservation.id,
        subject: `Réservation ${service.name} - ${reservationData.scheduled_date}`
      })
      .select()
      .single();

    if (threadError) {
      console.error("Error creating message thread:", threadError);
    }

    // Send initial message
    if (thread) {
      await supabase
        .from("messages")
        .insert({
          thread_id: thread.id,
          sender_id: user.id,
          content: `Nouvelle demande de réservation pour "${service.name}" le ${reservationData.scheduled_date} à ${reservationData.scheduled_time}.\n\nAdresse: ${reservationData.address}, ${reservationData.city}\n\nDescription: ${reservationData.description || 'Aucune description fournie'}`,
          message_type: "booking_update"
        });
    }

    // TODO: Send notification to artisan (email/push)
    console.log(`Reservation created successfully: ${reservation.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        reservation,
        thread,
        message: "Réservation créée avec succès"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in create-reservation function:", error);
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
