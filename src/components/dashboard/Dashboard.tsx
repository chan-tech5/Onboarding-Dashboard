import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import MetricCard from './MetricCard';
import { Users, Folder, Bell, LineChart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Dashboard: React.FC = () => {
  const { userData } = useOnboarding();
  const navigate = useNavigate();
  const [onboardingCompleted] = useLocalStorage('onboardingCompleted', false);

  useEffect(() => {
    if (!onboardingCompleted) {
      navigate('/');
    }
  }, [onboardingCompleted, navigate]);

  const metrics = [
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: <Users size={20} />,
      color: 'primary'
    },
    {
      title: 'Active Projects',
      value: '7',
      change: '+1',
      changeType: 'increase',
      icon: <Folder size={20} />,
      color: 'accent'
    },
    {
      title: 'Notifications',
      value: '5',
      change: '-3',
      changeType: 'decrease',
      icon: <Bell size={20} />,
      color: 'emerald'
    }
  ];

  const getLayoutClasses = () => {
    switch(userData.layout) {
      case 'compact':
        return 'gap-3 p-3';
      case 'spacious':
        return 'gap-6 p-6';
      case 'comfortable':
      default:
        return 'gap-4 p-4';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-accent-50 ${userData.theme === 'dark' ? 'dark' : ''}`}>
      <DashboardHeader userData={userData} />
      
      <div className="flex flex-1">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          <motion.div 
            className={`container mx-auto ${getLayoutClasses()}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-2xl font-bold text-gray-800 mb-6 mt-4"
              variants={itemVariants}
            >
              Welcome back, {userData.name}!
            </motion.h1>
            
            <motion.section 
              className="mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MetricCard {...metric} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            <motion.section 
              className="mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Progress</h2>
              
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-primary-100"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Project Completion Rate</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <LineChart size={16} className="mr-1" />
                    <span>Last 7 days</span>
                  </div>
                </div>
                
                <div className="h-48 flex items-center justify-center border-t pt-4">
                  <div className="space-y-4 w-full">
                    {[
                      { day: 'Monday', progress: 65 },
                      { day: 'Tuesday', progress: 70 },
                      { day: 'Wednesday', progress: 45 },
                      { day: 'Thursday', progress: 80 },
                      { day: 'Friday', progress: 60 }
                    ].map((day, index) => (
                      <motion.div 
                        key={day.day}
                        className="h-8 flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-20 text-sm text-gray-500">{day.day}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-primary-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${day.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <div className="w-10 text-sm text-gray-500 ml-2">{day.progress}%</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.section>
            
            <motion.section
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Company Information</h2>
              
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-primary-100"
                whileHover={{ y: -2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
                    <p className="text-gray-800">{userData.companyName}</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Industry</h3>
                    <p className="text-gray-800 capitalize">{userData.industry}</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Company Size</h3>
                    <p className="text-gray-800">{userData.companySize}</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Email</h3>
                    <p className="text-gray-800">{userData.email}</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;