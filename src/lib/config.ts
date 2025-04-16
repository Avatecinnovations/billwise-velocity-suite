
import { z } from "zod";

// Define the schema for environment variables with better defaults and optional fields
const envSchema = z.object({
  VITE_APP_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_APP_URL: z.string().url().default("http://localhost:5173"),
  VITE_PROJECT_URL: z.string().default("https://jsxbdrmcysgyurgbrdxu.supabase.co"),
  VITE_SECRET_ANON_KEY: z.string().default("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeGJkcm1jeXNneXVyZ2JyZHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTAzMzIsImV4cCI6MjA2MDI4NjMzMn0.61QX70LaqSiS__pi14jDBKiyXxtiuUuRZNNQckWuIdk"),
  VITE_RESEND_API_KEY: z.string().default(""),
});

// Type for the validated environment variables
type Env = z.infer<typeof envSchema>;

// Validate and export the environment variables with try/catch for better error handling
let env: Env;
try {
  env = envSchema.parse(import.meta.env);
} catch (error) {
  console.error("Environment variable validation failed:", error);
  // Provide fallback values for development
  env = {
    VITE_APP_ENV: "development",
    VITE_APP_URL: "http://localhost:5173",
    VITE_PROJECT_URL: "https://jsxbdrmcysgyurgbrdxu.supabase.co", 
    VITE_SECRET_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeGJkcm1jeXNneXVyZ2JyZHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTAzMzIsImV4cCI6MjA2MDI4NjMzMn0.61QX70LaqSiS__pi14jDBKiyXxtiuUuRZNNQckWuIdk",
    VITE_RESEND_API_KEY: "",
  };
}

export { env };

// Export type for use in other files
export type { Env };

// Helper function to check if we're in development
export const isDevelopment = () => env.VITE_APP_ENV === "development";

// Helper function to check if we're in production
export const isProduction = () => env.VITE_APP_ENV === "production";

// Helper function to get the current environment
export const getEnvironment = () => env.VITE_APP_ENV;
