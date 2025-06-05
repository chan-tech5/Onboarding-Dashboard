import React, { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface UserData {
  // Personal Info
  name: string;
  email: string;
  
  // Business Info
  companyName: string;
  industry: string;
  companySize: string;
  
  // Preferences
  theme: 'light' | 'dark' | 'system';
  layout: 'compact' | 'comfortable' | 'spacious';
}

interface OnboardingContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
}

const defaultUserData: UserData = {
  name: '',
  email: '',
  companyName: '',
  industry: '',
  companySize: '',
  theme: 'light',
  layout: 'comfortable',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage('userData', defaultUserData);
  const [currentStep, setCurrentStep] = useState(1);
  const [_, setOnboardingCompleted] = useLocalStorage('onboardingCompleted', false);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prevData => ({ ...prevData, ...data }));
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        userData,
        updateUserData,
        currentStep,
        setCurrentStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};