// src/components/auth/LoginPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/UI/Button';
import { mockAuthService } from '@services/auth/mockAuthService';
import { login as loginAction } from '@store/slices/authSlice';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Users,
  ChevronRight,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await instance.loginRedirect({
        scopes: ['openid', 'profile', 'email'],
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleMockLogin = async () => {
    try {
      setIsLoading(true);
      const { user } = await mockAuthService.login();
      dispatch(loginAction(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Mock login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Processing',
      description: 'Automatically extract and codify contract terms using advanced AI'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Real-time dashboards and forecasting for better decision making'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with HIPAA compliance built-in'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Streamlined workflows for contracts, finance, and compliance teams'
    }
  ];

  const benefits = [
    'Reduce manual processing time by 70%',
    'Improve rebate accuracy by 95%+',
    'Automated compliance reporting',
    'Real-time vendor performance tracking'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-glow">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Rebate Recovery</h1>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Streamline Your Medical Supplies
              <span className="block text-gradient bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Rebate Management
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Transform manual, error-prone rebate processes into an automated, AI-driven solution
              that scales with your organization.
            </p>

            <div className="grid grid-cols-1 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Right Side - Login */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 animate-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-300">
                Sign in to access your rebate management dashboard
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleMockLogin}
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>{isLoading ? 'Signing in...' : 'Demo Login'}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-slate-900/50 text-slate-400">or</span>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                variant="primary"
                size="lg"
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sign in with Microsoft</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Button>

              <div className="text-center">
                <p className="text-xs text-slate-400 leading-relaxed">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                  Your data is protected with enterprise-grade security.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">248</div>
                  <div className="text-xs text-slate-400">Contracts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">$2.4M</div>
                  <div className="text-xs text-slate-400">Managed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-12 space-y-6">
            <h3 className="text-xl font-bold text-white text-center">Key Features</h3>
            <div className="grid grid-cols-1 gap-4">
              {features.slice(0, 2).map((feature, index) => (
                <div key={feature.title} className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}