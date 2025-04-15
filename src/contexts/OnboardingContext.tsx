import React, { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingData {
  companyName: string;
  fullName: string;
  role: string;
  logo: string;
  profilePicture: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData | null;
  updateOnboardingData: (data: OnboardingData) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    () => {
      // Try to get data from localStorage on initial load
      const savedData = localStorage.getItem("onboardingData");
      return savedData ? JSON.parse(savedData) : null;
    }
  );

  const updateOnboardingData = (data: OnboardingData) => {
    setOnboardingData(data);
    // Save to localStorage for persistence
    localStorage.setItem("onboardingData", JSON.stringify(data));
  };

  return (
    <OnboardingContext.Provider
      value={{ onboardingData, updateOnboardingData }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
