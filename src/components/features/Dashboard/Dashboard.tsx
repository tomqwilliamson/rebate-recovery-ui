import React from 'react';
import { motion } from 'framer-motion';
import TrendChart from '@components/common/Charts/TrendChart';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Upload,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

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
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const Dashboard: React.FC = () => {
  const quickStats = [
    {
      title: 'Active Contracts',
      value: '248',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Expected Rebates',
      value: '$2.4M',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Processing Queue',
      value: '15',
      change: '-23%',
      trend: 'down',
      icon: Clock,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Compliance Rate',
      value: '94.8%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentUploads = [
    { id: 1, name: 'AMD-2024-001.pdf', status: 'completed', vendor: 'AmeriMed Solutions', uploadedAt: '2 hours ago' },
    { id: 2, name: 'MED-2024-015.pdf', status: 'processing', vendor: 'MedTech Supplies', uploadedAt: '4 hours ago' },
    { id: 3, name: 'SUR-2024-008.pdf', status: 'failed', vendor: 'Surgical Innovations', uploadedAt: '6 hours ago' },
    { id: 4, name: 'CAR-2024-022.pdf', status: 'completed', vendor: 'CardioVascular Inc', uploadedAt: '1 day ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'processing':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="text-center py-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Welcome to Rebate Recovery
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Streamline your medical supplies rebate management with AI-powered contract processing and analytics
        </p>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-vibrant border border-white/20 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-vibrant border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Uploads</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0">
                  {getStatusIcon(upload.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{upload.name}</p>
                  <p className="text-xs text-slate-500">{upload.vendor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={getStatusBadge(upload.status)}>
                    {upload.status}
                  </span>
                  <span className="text-xs text-slate-500">{upload.uploadedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-vibrant border border-white/20">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transition-all btn-vibrant"
            >
              <Upload className="w-8 h-8 mb-2" />
              <span className="font-medium">Upload Contract</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all btn-vibrant"
            >
              <TrendingUp className="w-8 h-8 mb-2" />
              <span className="font-medium">View Analytics</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all btn-vibrant"
            >
              <FileText className="w-8 h-8 mb-2" />
              <span className="font-medium">Browse Contracts</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl transition-all btn-vibrant"
            >
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span className="font-medium">Review Alerts</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-vibrant border border-white/20">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Rebate Trends</h3>
          <TrendChart 
            data={[
              { date: 'Jan 2025', value: 180000 },
              { date: 'Feb 2025', value: 220000 },
              { date: 'Mar 2025', value: 195000 },
              { date: 'Apr 2025', value: 285000 },
              { date: 'May 2025', value: 310000 },
              { date: 'Jun 2025', value: 275000 },
              { date: 'Jul 2025', value: 340000 },
              { date: 'Aug 2025', value: 365000 },
            ]}
          />
        </div>
        
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-vibrant border border-white/20">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Processing Pipeline</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Uploaded</span>
              <span className="text-sm font-medium text-slate-900">45</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-4/5"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Processing</span>
              <span className="text-sm font-medium text-slate-900">12</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full w-1/3"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Completed</span>
              <span className="text-sm font-medium text-slate-900">28</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};