import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'orange':
        return 'bg-orange-50 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getTrendIcon = () => {
    if (changeType === 'increase') {
      return <TrendingUp size={16} className="text-green-500" />;
    } else if (changeType === 'decrease') {
      return <TrendingDown size={16} className="text-red-500" />;
    }
    return null;
  };

  const getTrendColor = () => {
    if (changeType === 'increase') {
      return 'text-green-600';
    } else if (changeType === 'decrease') {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <div className="ml-2 flex items-center">
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
              <span className="ml-1">{getTrendIcon()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;