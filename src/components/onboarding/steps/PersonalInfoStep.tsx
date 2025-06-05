import React, { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { ArrowRight } from 'lucide-react';

interface PersonalInfoStepProps {
  onNext: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext }) => {
  const { userData, updateUserData } = useOnboarding();
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; email?: string } = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(userData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Personal Information</h2>
        <p className="text-gray-600 mb-4">Let's start with your basic information</p>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={userData.name}
          onChange={(e) => updateUserData({ name: e.target.value })}
          error={errors.name}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="johndoe@example.com"
          value={userData.email}
          onChange={(e) => updateUserData({ email: e.target.value })}
          error={errors.email}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="px-5">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;