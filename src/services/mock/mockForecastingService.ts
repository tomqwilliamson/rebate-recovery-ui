import { 
  RebateForecast, 
  ForecastFactor, 
  ForecastParameters, 
  ForecastAnalytics 
} from '../../types/rebate.types';

class MockForecastingService {
  private generateMockFactors(): ForecastFactor[] {
    const factorTemplates = [
      {
        factor: 'Volume Growth',
        impact: 15000,
        description: 'Expected increase in purchase volumes based on historical trends',
        weight: 0.3
      },
      {
        factor: 'Market Expansion',
        impact: 8500,
        description: 'New market segments showing increased adoption',
        weight: 0.25
      },
      {
        factor: 'Seasonal Variance',
        impact: -3200,
        description: 'Seasonal fluctuations affecting quarterly performance',
        weight: 0.15
      },
      {
        factor: 'Contract Renewals',
        impact: 12000,
        description: 'Impact of contract renewal negotiations',
        weight: 0.2
      },
      {
        factor: 'Economic Conditions',
        impact: -2500,
        description: 'Current economic climate effects on spending',
        weight: 0.1
      }
    ];

    return factorTemplates.map(template => ({
      ...template,
      impact: template.impact + (Math.random() - 0.5) * template.impact * 0.3
    }));
  }

  private generateForecastPeriods(
    startPeriod: string, 
    forecastType: 'quarterly' | 'annual' | 'monthly',
    count: number = 4
  ): string[] {
    const periods: string[] = [];
    const start = new Date(startPeriod);
    
    for (let i = 0; i < count; i++) {
      const date = new Date(start);
      
      switch (forecastType) {
        case 'quarterly':
          date.setMonth(start.getMonth() + (i * 3));
          periods.push(`Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`);
          break;
        case 'annual':
          date.setFullYear(start.getFullYear() + i);
          periods.push(`${date.getFullYear()}`);
          break;
        case 'monthly':
          date.setMonth(start.getMonth() + i);
          periods.push(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`);
          break;
      }
    }
    
    return periods;
  }

  async generateForecasts(params: ForecastParameters = {}): Promise<RebateForecast[]> {
    const {
      contractId = 'all',
      startPeriod = '2024-01-01',
      forecastType = 'quarterly',
      includeHistorical = false
    } = params;

    const baseAmount = 45000 + Math.random() * 20000;
    const growthRate = 0.05 + Math.random() * 0.15;
    
    const periods = this.generateForecastPeriods(startPeriod, forecastType, 6);
    
    return periods.map((period, index) => {
      const factors = this.generateMockFactors();
      const totalImpact = factors.reduce((sum, factor) => sum + factor.impact, 0);
      const projectedAmount = baseAmount * Math.pow(1 + growthRate, index) + totalImpact;
      
      const confidence = Math.max(0.6, Math.min(0.95, 0.85 - (index * 0.05) + (Math.random() - 0.5) * 0.1));

      return {
        id: `forecast_${Date.now()}_${index}`,
        contractId,
        period,
        projectedAmount: Math.round(projectedAmount),
        confidence: Math.round(confidence * 100) / 100,
        factors,
        createdAt: new Date().toISOString(),
        forecastType,
        baselineAmount: Math.round(baseAmount * Math.pow(1 + growthRate, index)),
        growthRate: Math.round(growthRate * 10000) / 100
      };
    });
  }

  async getForecastAnalytics(forecasts: RebateForecast[]): Promise<ForecastAnalytics> {
    const totalProjectedRevenue = forecasts.reduce((sum, f) => sum + f.projectedAmount, 0);
    const averageConfidence = forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length;
    
    const riskFactors = [
      'Economic uncertainty affecting spending patterns',
      'Competitive pressure in key market segments',
      'Supply chain disruptions impacting volumes'
    ];
    
    const opportunities = [
      'New product lines showing strong early adoption',
      'Expansion into adjacent market segments',
      'Digital transformation driving efficiency gains'
    ];

    const isGrowingTrend = forecasts.length > 1 && 
      forecasts[forecasts.length - 1].projectedAmount > forecasts[0].projectedAmount;
    
    const trendPercentage = forecasts.length > 1 
      ? ((forecasts[forecasts.length - 1].projectedAmount - forecasts[0].projectedAmount) / forecasts[0].projectedAmount) * 100
      : 0;

    return {
      totalProjectedRevenue: Math.round(totalProjectedRevenue),
      averageConfidence: Math.round(averageConfidence * 100) / 100,
      riskFactors,
      opportunities,
      trendAnalysis: {
        direction: Math.abs(trendPercentage) < 2 ? 'stable' : isGrowingTrend ? 'up' : 'down',
        percentage: Math.round(Math.abs(trendPercentage) * 100) / 100,
        description: isGrowingTrend 
          ? 'Forecasts show positive growth trajectory'
          : trendPercentage < -2 
            ? 'Declining trend requires attention'
            : 'Stable performance with minimal variance'
      }
    };
  }

  async getHistoricalAccuracy(): Promise<{
    period: string;
    predicted: number;
    actual: number;
    accuracy: number;
  }[]> {
    const periods = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];
    
    return periods.map(period => {
      const predicted = 40000 + Math.random() * 30000;
      const variance = (Math.random() - 0.5) * 0.2;
      const actual = predicted * (1 + variance);
      const accuracy = Math.max(0.7, 1 - Math.abs(variance));
      
      return {
        period,
        predicted: Math.round(predicted),
        actual: Math.round(actual),
        accuracy: Math.round(accuracy * 100) / 100
      };
    });
  }

  async simulateScenarios(baseForecasts: RebateForecast[]): Promise<{
    scenario: string;
    description: string;
    forecasts: RebateForecast[];
  }[]> {
    const scenarios = [
      {
        scenario: 'Optimistic',
        description: 'Best case scenario with favorable market conditions',
        multiplier: 1.15
      },
      {
        scenario: 'Conservative',
        description: 'Conservative estimates with reduced market growth',
        multiplier: 0.85
      },
      {
        scenario: 'Market Disruption',
        description: 'Significant market changes affecting traditional patterns',
        multiplier: 0.7
      }
    ];

    return scenarios.map(({ scenario, description, multiplier }) => ({
      scenario,
      description,
      forecasts: baseForecasts.map(forecast => ({
        ...forecast,
        id: `${forecast.id}_${scenario.toLowerCase()}`,
        projectedAmount: Math.round(forecast.projectedAmount * multiplier),
        confidence: Math.max(0.5, forecast.confidence * 0.9),
        factors: forecast.factors.map(factor => ({
          ...factor,
          impact: factor.impact * multiplier
        }))
      }))
    }));
  }
}

export const mockForecastingService = new MockForecastingService();