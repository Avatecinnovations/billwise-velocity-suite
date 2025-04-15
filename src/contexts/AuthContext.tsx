import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../integrations/supabase/client";

// User role definitions
export type UserRole = "admin" | "accountant" | "client" | "regular";

// Extended user interface to include additional properties
interface ExtendedUser extends User {
  isAdmin?: boolean;
  role?: UserRole;
  businessName?: string;
  currency?: string;
  industry?: string;
  onboardingCompleted?: boolean;
}

interface AuthContextProps {
  session: Session | null;
  user: ExtendedUser | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
  onboardingCompleted: boolean;
  updateUserProfile: (profileData: Partial<ExtendedUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  isAdmin: false,
  userRole: null,
  onboardingCompleted: false,
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (adminLoggedIn) {
      // Create a mock user and session for admin
      const mockUser: ExtendedUser = {
        id: "admin-user",
        app_metadata: {},
        user_metadata: {
          role: "admin",
          onboardingCompleted: true,
        },
        aud: "authenticated",
        created_at: "",
        isAdmin: true,
        role: "admin",
        onboardingCompleted: true,
      };

      setUser(mockUser);
      setIsAdmin(true);
      setUserRole("admin");
      setOnboardingCompleted(true);
      setLoading(false);
      return;
    }

    // For regular users, set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        const extendedUser: ExtendedUser = {
          ...newSession.user,
          role: (newSession.user.user_metadata?.role as UserRole) || "regular",
          onboardingCompleted:
            newSession.user.user_metadata?.onboardingCompleted || false,
          businessName: newSession.user.user_metadata?.businessName,
          currency: newSession.user.user_metadata?.currency,
          industry: newSession.user.user_metadata?.industry,
        };
        setUser(extendedUser);
        setUserRole(extendedUser.role || null);
        setOnboardingCompleted(!!extendedUser.onboardingCompleted);
      } else {
        setUser(null);
        setUserRole(null);
        setOnboardingCompleted(false);
      }

      setIsAdmin(false);
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);

      if (currentSession?.user) {
        const extendedUser: ExtendedUser = {
          ...currentSession.user,
          role:
            (currentSession.user.user_metadata?.role as UserRole) || "regular",
          onboardingCompleted:
            currentSession.user.user_metadata?.onboardingCompleted || false,
          businessName: currentSession.user.user_metadata?.businessName,
          currency: currentSession.user.user_metadata?.currency,
          industry: currentSession.user.user_metadata?.industry,
        };
        setUser(extendedUser);
        setUserRole(extendedUser.role || null);
        setOnboardingCompleted(!!extendedUser.onboardingCompleted);
      } else {
        setUser(null);
        setUserRole(null);
        setOnboardingCompleted(false);
      }

      setIsAdmin(false);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateUserProfile = async (profileData: Partial<ExtendedUser>) => {
    try {
      if (!user) throw new Error("No user logged in");

      // For admin users (managed by localStorage)
      if (isAdmin) {
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        return;
      }

      // For regular Supabase users
      const { data, error } = await supabase.auth.updateUser({
        data: profileData,
      });

      if (error) throw error;

      // Update local state
      if (data.user) {
        const updatedUser: ExtendedUser = {
          ...data.user,
          role:
            (data.user.user_metadata?.role as UserRole) ||
            userRole ||
            "regular",
          onboardingCompleted:
            data.user.user_metadata?.onboardingCompleted || onboardingCompleted,
          businessName:
            data.user.user_metadata?.businessName || user.businessName,
          currency: data.user.user_metadata?.currency || user.currency,
          industry: data.user.user_metadata?.industry || user.industry,
        };

        setUser(updatedUser);
        setUserRole(updatedUser.role || null);
        setOnboardingCompleted(!!updatedUser.onboardingCompleted);
      }
    } catch (error: any) {
      console.error("Error updating user profile:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    // Check if it's an admin logout
    if (isAdmin) {
      localStorage.removeItem("isAdminLoggedIn");
      setUser(null);
      setIsAdmin(false);
      setUserRole(null);
      setOnboardingCompleted(false);
      return;
    }

    // Regular Supabase logout
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signOut,
        loading,
        isAdmin,
        userRole,
        onboardingCompleted,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
