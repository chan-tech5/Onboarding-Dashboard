import React, { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BusinessInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501+', label: '501+ employees' },
];

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ onNext, onBack }) => {
  const { userData, updateUserData } = useOnboarding();
  const [errors, setErrors] = useState<{ 
    companyName?: string; 
    industry?: string;
    companySize?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {
      companyName?: string; 
      industry?: string;
      companySize?: string;
    } = {};
    
    if (!userData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!userData.industry) {
      newErrors.industry = 'Please select an industry';
    }
    
    if (!userData.companySize) {
      newErrors.companySize = 'Please select company size';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Business Information</h2>
        <p className="text-gray-600 mb-4">Tell us about your company</p>
        
        <Input
          label="Company Name"
          type="text"
          placeholder="Acme Inc."
          value={userData.companyName}
          onChange={(e) => updateUserData({ companyName: e.target.value })}
          error={errors.companyName}
          required
        />
        
        <Select
          label="Industry"
          options={industryOptions}
          value={userData.industry}
          onChange={(value) => updateUserData({ industry: value })}
          error={errors.industry}
          required
        />
        
        <Select
          label="Company Size"
          options={companySizeOptions}
          value={userData.companySize}
          onChange={(value) => updateUserData({ companySize: value })}
          error={errors.companySize}
          required
        />
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default BusinessInfoStep;