import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  FileText,
  Calculator,
  BarChart3,
  Settings,
  TrendingUp,
  X,
  ChevronDown
} from 'lucide-react';
import { RootState } from '@store/store';
import { closeSidebar } from '@store/slices/uiSlice';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  {
    name: 'Contracts',
    icon: FileText,
    children: [
      { name: 'All Contracts', href: '/contracts' },
      { name: 'Upload Contract', href: '/contracts/upload' },
    ]
  },
  {
    name: 'Rebates',
    icon: Calculator,
    children: [
      { name: 'Calculations', href: '/rebates/calculations' },
      { name: 'Validation', href: '/rebates/validation' },
      { name: 'Forecasting', href: '/rebates/forecasting' },
    ]
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    children: [
      { name: 'Overview', href: '/analytics' },
      { name: 'Compliance Reports', href: '/analytics/compliance' },
    ]
  },
  {
    name: 'Settings',
    icon: Settings,
    children: [
      { name: 'User Management', href: '/settings/users' },
      { name: 'System Config', href: '/settings/system' },
    ]
  },
];

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [isLargeScreen, setIsLargeScreen] = React.useState(window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isLargeScreen ? 0 : (sidebarOpen ? 0 : -320),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-80 bg-white/90 backdrop-blur-lg border-r border-slate-200/50 shadow-xl lg:relative lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-glow">
                <span className="text-white font-bold">R</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Rebate Recovery</h2>
                <p className="text-xs text-slate-500">Medical Supplies</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(closeSidebar())}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-slate-700 hover:bg-slate-100 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 text-slate-500 group-hover:text-primary-500 transition-colors" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedItems.includes(item.name) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </motion.div>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedItems.includes(item.name) ? 'auto' : 0,
                          opacity: expandedItems.includes(item.name) ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.href}
                              to={child.href}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm rounded-lg transition-colors ${
                                  isActive
                                    ? 'bg-primary-100 text-primary-700 font-medium'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`
                              }
                            >
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200/50">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">System Status</p>
                  <p className="text-xs text-slate-600">All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};