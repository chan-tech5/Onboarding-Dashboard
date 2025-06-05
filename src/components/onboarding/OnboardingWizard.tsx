import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressBar from '../ui/ProgressBar';
import PersonalInfoStep from './steps/PersonalInfoStep';
import BusinessInfoStep from './steps/BusinessInfoStep';
import PreferencesStep from './steps/PreferencesStep';
import { Briefcase } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const { currentStep, setCurrentStep, completeOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} />;
      case 2:
        return <BusinessInfoStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PreferencesStep onSubmit={handleNext} onBack={handleBack} />;
      default:
        return <PersonalInfoStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-primary-100 via-accent-100 to-primary-50 animate-gradient">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/90"
      >
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <Briefcase className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-white">Business Dashboard Setup</h1>
        </div>
        
        <div className="px-6 pt-6">
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        </div>
        
        <div className="p-6 relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard