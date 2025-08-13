import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  ChevronDown,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/store';
import { toggleSidebar, toggleTheme } from '@store/slices/uiSlice';
import { logout } from '@store/slices/authSlice';
import { mockAuthService } from '@services/auth/mockAuthService';
import { useAuth } from '@hooks/useAuth';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    // Check if user is using mock authentication
    if (mockAuthService.isAuthenticated()) {
      await mockAuthService.logout();
      dispatch(logout());
      navigate('/login');
    } else {
      instance.logoutRedirect();
    }
  };

  const notifications = [
    { id: 1, message: 'Contract AMD-2024-001 processing completed', time: '2 min ago', type: 'success' },
    { id: 2, message: 'Rebate validation failed for Contract MED-2024-015', time: '10 min ago', type: 'error' },
    { id: 3, message: 'New amendment uploaded for Contract SUR-2024-008', time: '1 hour ago', type: 'info' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm relative z-50"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Navigation Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-slate-600 transition-all"></div>
              <div className="w-full h-0.5 bg-slate-600 transition-all"></div>
              <div className="w-full h-0.5 bg-slate-600 transition-all"></div>
            </div>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">Rebate Recovery</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contracts, vendors, or rebates..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-slate-600" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-vibrant border border-slate-200 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success-500' :
                          notification.type === 'error' ? 'bg-error-500' : 'bg-primary-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-vibrant border border-slate-200 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-medium text-slate-900">
                    {user ? `${user.firstName} ${user.lastName}` : 'John Doe'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user ? user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Contract Manager'}
                  </p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};