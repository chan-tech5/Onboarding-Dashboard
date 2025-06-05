import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <motion.div 
            key={step} 
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step * 0.1 }}
          >
            <motion.div 
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 z-10
                ${step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
              animate={{
                scale: step <= currentStep ? [1, 1.1, 1] : 1,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {step}
              </motion.span>
            </motion.div>
            <motion.span 
              className={`text-xs mt-2 font-medium transition-colors
                ${step <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {step === 1 ? 'Personal' : step === 2 ? 'Business' : 'Preferences'}
            </motion.span>
          </motion.div>
        ))}
      </div>
      
      <div className="relative pt-4">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;