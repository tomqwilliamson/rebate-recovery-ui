export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'contract' | 'rebate' | 'compliance' | 'system';
  createdAt: string;
  status: 'active' | 'acknowledged' | 'resolved';
  actionRequired: boolean;
  dueDate?: string;
  contractId?: string;
  rebateCalculationId?: string;
}

class MockAlertsService {
  private mockAlerts: Alert[] = [
    {
      id: 'alert-001',
      title: 'Contract Expiration Warning',
      description: 'Contract with AmeriMed Solutions expires in 30 days',
      severity: 'high',
      category: 'contract',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: 'active',
      actionRequired: true,
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString(), // 30 days from now
      contractId: 'contract-med-supplies-2024'
    },
    {
      id: 'alert-002',
      title: 'Rebate Calculation Variance',
      description: 'Expected vs actual rebate variance exceeds 5% threshold',
      severity: 'medium',
      category: 'rebate',
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      status: 'active',
      actionRequired: true,
      contractId: 'contract-surgical-equipment',
      rebateCalculationId: 'calc-002'
    },
    {
      id: 'alert-003',
      title: 'Compliance Audit Due',
      description: 'Quarterly compliance audit is due within 7 days',
      severity: 'medium',
      category: 'compliance',
      createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      status: 'active',
      actionRequired: true,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString() // 7 days from now
    },
    {
      id: 'alert-004',
      title: 'System Maintenance Scheduled',
      description: 'Scheduled system maintenance on Saturday 2:00 AM - 4:00 AM',
      severity: 'low',
      category: 'system',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'active',
      actionRequired: false,
      dueDate: new Date(Date.now() + 5 * 86400000).toISOString() // 5 days from now
    },
    {
      id: 'alert-005',
      title: 'Invalid Contract Terms Detected',
      description: 'Potential issues found in contract terms for MedTech Pharma',
      severity: 'high',
      category: 'contract',
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      status: 'acknowledged',
      actionRequired: true,
      contractId: 'contract-pharma-supplies'
    },
    {
      id: 'alert-006',
      title: 'Payment Processing Delay',
      description: 'Rebate payment processing delayed due to bank holiday',
      severity: 'low',
      category: 'rebate',
      createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
      status: 'active',
      actionRequired: false,
      rebateCalculationId: 'calc-003'
    },
    {
      id: 'alert-007',
      title: 'Missing Documentation',
      description: 'Required compliance documentation missing for Q3 2024',
      severity: 'critical',
      category: 'compliance',
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      status: 'active',
      actionRequired: true,
      dueDate: new Date(Date.now() + 3 * 86400000).toISOString() // 3 days from now
    },
    {
      id: 'alert-008',
      title: 'Database Connection Restored',
      description: 'Database connectivity issues have been resolved',
      severity: 'low',
      category: 'system',
      createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      status: 'resolved',
      actionRequired: false
    }
  ];

  async getAlerts(params?: {
    status?: string;
    severity?: string;
    category?: string;
    limit?: number;
  }): Promise<Alert[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredAlerts = [...this.mockAlerts];

    // Apply filters
    if (params?.status && params.status !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.status === params.status);
    }

    if (params?.severity && params.severity !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.severity === params.severity);
    }

    if (params?.category && params.category !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.category === params.category);
    }

    // Sort by creation date (newest first)
    filteredAlerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply limit
    if (params?.limit) {
      filteredAlerts = filteredAlerts.slice(0, params.limit);
    }

    return filteredAlerts;
  }

  async getAlert(id: string): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const alert = this.mockAlerts.find(a => a.id === id);
    if (!alert) {
      throw new Error('Alert not found');
    }
    return alert;
  }

  async acknowledgeAlert(id: string): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const alertIndex = this.mockAlerts.findIndex(a => a.id === id);
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }

    const alert = { ...this.mockAlerts[alertIndex] };
    alert.status = 'acknowledged';
    this.mockAlerts[alertIndex] = alert;
    
    return alert;
  }

  async resolveAlert(id: string): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const alertIndex = this.mockAlerts.findIndex(a => a.id === id);
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }

    const alert = { ...this.mockAlerts[alertIndex] };
    alert.status = 'resolved';
    this.mockAlerts[alertIndex] = alert;
    
    return alert;
  }

  async getAlertSummary(): Promise<{
    total: number;
    active: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    actionRequired: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const activeAlerts = this.mockAlerts.filter(a => a.status === 'active');
    
    return {
      total: this.mockAlerts.length,
      active: activeAlerts.length,
      critical: activeAlerts.filter(a => a.severity === 'critical').length,
      high: activeAlerts.filter(a => a.severity === 'high').length,
      medium: activeAlerts.filter(a => a.severity === 'medium').length,
      low: activeAlerts.filter(a => a.severity === 'low').length,
      actionRequired: activeAlerts.filter(a => a.actionRequired).length
    };
  }
}

export const mockAlertsService = new MockAlertsService();