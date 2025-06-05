import React from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import Button from '../../ui/Button';
import { ArrowLeft, Check, Moon, Sun, Layout } from 'lucide-react';

interface PreferencesStepProps {
  onSubmit: () => void;
  onBack: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ onSubmit, onBack }) => {
  const { userData, updateUserData } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Preferences</h2>
        <p className="text-gray-600 mb-6">Customize your dashboard experience</p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Theme Preference
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', label: 'Light', icon: <Sun size={18} /> },
              { value: 'dark', label: 'Dark', icon: <Moon size={18} /> },
              { value: 'system', label: 'System', icon: <Layout size={18} /> }
            ].map((theme) => (
              <div
                key={theme.value}
                onClick={() => updateUserData({ theme: theme.value as 'light' | 'dark' | 'system' })}
                className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all
                  ${userData.theme === theme.value 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                {userData.theme === theme.value && (
                  <div className="absolute top-2 right-2 h-4 w-4 text-blue-600">
                    <Check size={16} />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 text-gray-700">{theme.icon}</div>
                  <span className="text-sm font-medium">{theme.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dashboard Layout
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'spacious', label: 'Spacious' }
            ].map((layout) => (
              <div
                key={layout.value}
                onClick={() => updateUserData({ layout: layout.value as 'compact' | 'comfortable' | 'spacious' })}
                className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all
                  ${userData.layout === layout.value 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                {userData.layout === layout.value && (
                  <div className="absolute top-2 right-2 h-4 w-4 text-blue-600">
                    <Check size={16} />
                  </div>
                )}
                <div className="flex items-center justify-center h-8">
                  <div className={`bg-gray-200 rounded w-12 ${
                    layout.value === 'compact' ? 'h-1' : 
                    layout.value === 'comfortable' ? 'h-2' : 'h-3'
                  }`}></div>
                </div>
                <span className="text-sm font-medium mt-2">{layout.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" className="px-5">
          Complete Setup
        </Button>
      </div>
    </form>
  );
};

export default PreferencesStep;