import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@components/common/Layout';
import { LoginPage } from '@components/auth/LoginPage';
import { ProtectedRoute } from '@components/auth/ProtectedRoute';
import { Dashboard } from '@components/features/Dashboard';
import { ContractList, ContractUpload, ContractDetails } from '@components/features/Contracts';
import { RebateCalculations, RebateValidation, RebateForecasting } from '@components/features/Rebates';
import { Analytics as AnalyticsPage, ComplianceReports } from '@components/features/Analytics';
import { UserManagement, SystemConfiguration } from '@components/features/Settings';
import { useAuth } from '@hooks/useAuth';
import { mockAuthService } from '@services/auth/mockAuthService';
import './app.css';

const App: React.FC = () => {
  const isAuthenticatedMsal = useIsAuthenticated();
  const { isAuthenticated: isAuthenticatedRedux } = useAuth();
  const isMockAuthenticated = mockAuthService.isAuthenticated();

  const isAuthenticated = isAuthenticatedMsal || isAuthenticatedRedux || isMockAuthenticated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Navigate to="/dashboard" replace />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
              
              {/* Contract Routes */}
              <Route
                path="/contracts"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ContractList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contracts/upload"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ContractUpload />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contracts/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ContractDetails />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Rebate Routes */}
              <Route
                path="/rebates/calculations"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RebateCalculations />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rebates/validation"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RebateValidation />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rebates/forecasting"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RebateForecasting />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Analytics Routes */}
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AnalyticsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics/compliance"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ComplianceReports />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Settings Routes */}
              <Route
                path="/settings/users"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <UserManagement />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/system"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SystemConfiguration />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;