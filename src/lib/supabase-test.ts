import { supabase } from "@/integrations/supabase/client";

export async function testSupabaseConnection() {
  try {
    // Test authentication
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError) {
      console.error("Auth test failed:", authError.message);
      return false;
    }

    // Test database connection by fetching a simple query
    const { data, error: dbError } = await supabase
      .from("invoices")
      .select("count")
      .limit(1);

    if (dbError) {
      console.error("Database test failed:", dbError.message);
      return false;
    }

    console.log("Supabase connection test successful!");
    console.log("Session:", session ? "Active" : "No active session");
    console.log("Database connection:", "Working");

    return true;
  } catch (error) {
    console.error("Supabase test failed:", error);
    return false;
  }
}
