import React from 'react';
import { 
  Home, Users, BarChart2, Settings, 
  MessageSquare, Calendar, FileText, HelpCircle 
} from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {[
            { name: 'Dashboard', icon: Home, current: true },
            { name: 'Team', icon: Users, current: false },
            { name: 'Projects', icon: FileText, current: false },
            { name: 'Calendar', icon: Calendar, current: false },
            { name: 'Messages', icon: MessageSquare, current: false },
            { name: 'Analytics', icon: BarChart2, current: false },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                item.current
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  item.current ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                }`}
              />
              {item.name}
            </a>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="space-y-1">
            {[
              { name: 'Settings', icon: Settings },
              { name: 'Help & Support', icon: HelpCircle },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;