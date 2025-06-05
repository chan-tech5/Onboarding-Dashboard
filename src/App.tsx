import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import Dashboard from './components/dashboard/Dashboard';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [onboardingCompleted] = useLocalStorage('onboardingCompleted', false);

  return (
    <Router>
      <OnboardingProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route 
              path="/" 
              element={onboardingCompleted ? <Navigate to="/dashboard" /> : <OnboardingWizard />} 
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </OnboardingProvider>
    </Router>
  );
}

export default App;