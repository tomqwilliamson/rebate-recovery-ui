import React from 'react';
import { Card } from '@components/common/UI';
import { TrendingUp, PieChart, BarChart } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Rebates</p>
              <p className="text-2xl font-bold text-slate-900">$1.2M</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Contracts</p>
              <p className="text-2xl font-bold text-slate-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
              <BarChart className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-slate-900">94%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add more analytics content here */}
    </div>
  );
};

export default AnalyticsPage;