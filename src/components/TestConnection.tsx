import { useEffect, useState } from "react";
import { testSupabaseConnection } from "@/lib/supabase-test";

export function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "success" | "error"
  >("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const success = await testSupabaseConnection();
        setConnectionStatus(success ? "success" : "error");
      } catch (err) {
        setConnectionStatus("error");
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }

    checkConnection();
  }, []);

  if (connectionStatus === "checking") {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-lg">
        Checking Supabase connection...
      </div>
    );
  }

  if (connectionStatus === "error") {
    return (
      <div className="fixed top-4 right-4 bg-red-100 text-red-800 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold">Supabase Connection Error</h3>
        <p>{error || "Failed to connect to Supabase"}</p>
        <p className="text-sm mt-2">
          Please check your environment variables and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-lg">
      <h3 className="font-bold">Supabase Connected</h3>
      <p>Successfully connected to your Supabase project.</p>
    </div>
  );
}
