import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  VITE_APP_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_APP_URL: z.string().url(),
  VITE_PROJECT_URL: z.string().url(),
  VITE_SECRET_ANON_KEY: z.string().min(1),
  VITE_RESEND_API_KEY: z.string().min(1),
});

// Type for the validated environment variables
type Env = z.infer<typeof envSchema>;

// Validate and export the environment variables
export const env = envSchema.parse(import.meta.env);

// Export type for use in other files
export type { Env };

// Helper function to check if we're in development
export const isDevelopment = () => env.VITE_APP_ENV === "development";

// Helper function to check if we're in production
export const isProduction = () => env.VITE_APP_ENV === "production";

// Helper function to get the current environment
export const getEnvironment = () => env.VITE_APP_ENV;
