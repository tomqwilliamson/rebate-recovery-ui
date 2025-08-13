import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { TrendChart } from '../../common/Charts';
import { Card } from '../../common/UI';
import { formatCurrency } from '../../../utils/formatters';

// Mock data
const mockForecasts = [
  { period: '2025 Q1', projectedAmount: 150000, confidence: 0.85 },
  { period: '2025 Q2', projectedAmount: 175000, confidence: 0.82 },
  { period: '2025 Q3', projectedAmount: 200000, confidence: 0.78 },
  { period: '2025 Q4', projectedAmount: 225000, confidence: 0.75 },
];

const mockFactors = [
  { factor: 'Seasonal Trends', impact: 0.3, description: 'Historical seasonal patterns' },
  { factor: 'Market Growth', impact: 0.25, description: 'Industry growth rate' },
  { factor: 'Contract Terms', impact: 0.2, description: 'New contract provisions' },
  { factor: 'Historical Performance', impact: 0.25, description: 'Past rebate trends' },
];

export const RebateForecasting: React.FC = () => {
  const formatData = (data: typeof mockForecasts) => {
    return data.map(item => ({
      date: item.period,
      value: item.projectedAmount
    }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gradient">Rebate Forecasting</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Projected Rebates</h2>
          <div className="h-[400px]">
            <TrendChart 
              data={formatData(mockForecasts)}
              height={400}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Forecast Details</h2>
          <div className="space-y-4">
            {mockForecasts.map((forecast, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white/50 rounded-lg">
                <div>
                  <h3 className="font-medium">{forecast.period}</h3>
                  <p className="text-sm text-slate-600">Confidence: {(forecast.confidence * 100).toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(forecast.projectedAmount)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Impact Factors</h2>
          <div className="space-y-4">
            {mockFactors.map((factor, index) => (
              <div key={index} className="p-4 bg-white/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{factor.factor}</h3>
                  <span className="text-sm font-semibold">
                    {(factor.impact * 100).toFixed(0)}% Impact
                  </span>
                </div>
                <p className="text-sm text-slate-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};