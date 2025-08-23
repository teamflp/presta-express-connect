
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SearchFilters {
  category?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // km
  rating?: number;
  emergency?: boolean;
  availability?: string; // 'today', 'week', 'month'
  priceRange?: {
    min?: number;
    max?: number;
  };
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

    const { filters, page = 1, limit = 10 }: { filters: SearchFilters; page?: number; limit?: number } = await req.json();

    console.log("Searching artisans with filters:", filters);

    // Base query
    let query = supabase
      .from("artisan_profiles")
      .select(`
        *,
        artisan_services!inner(
          id,
          name,
          description,
          pricing_type,
          base_price,
          min_price,
          max_price,
          category_id,
          service_categories(name, slug, icon)
        )
      `)
      .eq("is_verified", true);

    // Apply filters
    if (filters.category) {
      query = query.eq("artisan_services.service_categories.slug", filters.category);
    }

    if (filters.city) {
      query = query.ilike("city", `%${filters.city}%`);
    }

    if (filters.rating) {
      query = query.gte("rating", filters.rating);
    }

    if (filters.emergency) {
      query = query.eq("artisan_services.is_emergency", true);
    }

    // Execute query
    const { data: artisans, error } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // Filter by geolocation if provided
    let filteredArtisans = artisans || [];
    if (filters.latitude && filters.longitude && filters.radius) {
      filteredArtisans = artisans?.filter(artisan => {
        if (!artisan.location) return false;
        
        // Calculate distance (simplified)
        const distance = calculateDistance(
          filters.latitude!,
          filters.longitude!,
          artisan.location.coordinates[1], // latitude
          artisan.location.coordinates[0]  // longitude
        );
        
        return distance <= filters.radius!;
      }) || [];
    }

    // Get availability info if requested
    if (filters.availability) {
      const now = new Date();
      let startDate: Date;
      let endDate: Date;

      switch (filters.availability) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 1);
          break;
        case 'week':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        default:
          startDate = new Date();
          endDate = new Date();
          endDate.setDate(endDate.getDate() + 7);
      }

      // Check availability for each artisan
      for (const artisan of filteredArtisans) {
        const { data: availabilitySlots } = await supabase
          .from("availability_slots")
          .select("*")
          .eq("artisan_id", artisan.id)
          .eq("is_available", true);

        const { data: exceptions } = await supabase
          .from("booking_exceptions")
          .select("*")
          .eq("artisan_id", artisan.id)
          .gte("exception_date", startDate.toISOString())
          .lte("exception_date", endDate.toISOString());

        artisan.available_slots = availabilitySlots || [];
        artisan.exceptions = exceptions || [];
      }
    }

    // Add distance to results if geolocation provided
    if (filters.latitude && filters.longitude) {
      filteredArtisans = filteredArtisans.map(artisan => ({
        ...artisan,
        distance: artisan.location ? calculateDistance(
          filters.latitude!,
          filters.longitude!,
          artisan.location.coordinates[1],
          artisan.location.coordinates[0]
        ) : null
      }));

      // Sort by distance
      filteredArtisans.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    return new Response(
      JSON.stringify({
        artisans: filteredArtisans,
        total: filteredArtisans.length,
        page,
        limit,
        filters
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in search-artisans function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        artisans: [],
        total: 0 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
