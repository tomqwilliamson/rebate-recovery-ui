export interface SystemConfiguration {
  category: string;
  settings: SystemSetting[];
}

export interface SystemSetting {
  id: string;
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect' | 'json';
  value: any;
  defaultValue: any;
  options?: Array<{ label: string; value: any }>;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  category: string;
  section: string;
  isAdvanced?: boolean;
  requiresRestart?: boolean;
  lastModified: string;
  modifiedBy: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  version: string;
  environment: 'development' | 'staging' | 'production';
  services: Array<{
    name: string;
    status: 'online' | 'offline' | 'degraded';
    uptime: number;
    responseTime: number;
    lastChecked: string;
  }>;
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    activeConnections: number;
  };
  database: {
    connectionStatus: 'connected' | 'disconnected';
    queryPerformance: number;
    poolSize: number;
    activeConnections: number;
  };
  integrations: Array<{
    name: string;
    type: 'api' | 'database' | 'service';
    status: 'connected' | 'error' | 'timeout';
    lastSync: string;
    errorCount: number;
  }>;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'access';
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure' | 'warning';
}

class MockSystemConfigService {
  private mockSettings: SystemSetting[] = [
    // Authentication Settings
    {
      id: 'auth-session-timeout',
      name: 'Session Timeout',
      description: 'User session timeout in minutes',
      type: 'number',
      value: 480,
      defaultValue: 480,
      validation: { required: true, min: 30, max: 1440 },
      category: 'Authentication',
      section: 'Sessions',
      requiresRestart: false,
      lastModified: '2024-08-15T10:30:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'auth-mfa-required',
      name: 'Require Multi-Factor Authentication',
      description: 'Enforce MFA for all users',
      type: 'boolean',
      value: true,
      defaultValue: false,
      category: 'Authentication',
      section: 'Security',
      requiresRestart: false,
      lastModified: '2024-08-10T14:20:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'auth-password-policy',
      name: 'Password Policy',
      description: 'Password complexity requirements',
      type: 'select',
      value: 'strict',
      defaultValue: 'standard',
      options: [
        { label: 'Basic (8+ characters)', value: 'basic' },
        { label: 'Standard (8+ chars, mixed case)', value: 'standard' },
        { label: 'Strict (12+ chars, symbols, mixed case)', value: 'strict' }
      ],
      category: 'Authentication',
      section: 'Security',
      requiresRestart: false,
      lastModified: '2024-08-05T09:15:00Z',
      modifiedBy: 'admin@company.com'
    },

    // Rebate Processing Settings
    {
      id: 'rebate-auto-approval-threshold',
      name: 'Auto-Approval Threshold',
      description: 'Maximum rebate amount for automatic approval',
      type: 'number',
      value: 50000,
      defaultValue: 25000,
      validation: { required: true, min: 1000, max: 1000000 },
      category: 'Rebate Processing',
      section: 'Workflow',
      requiresRestart: false,
      lastModified: '2024-08-18T11:45:00Z',
      modifiedBy: 'sarah.johnson@company.com'
    },
    {
      id: 'rebate-variance-tolerance',
      name: 'Variance Tolerance (%)',
      description: 'Acceptable variance percentage for rebate calculations',
      type: 'number',
      value: 5.0,
      defaultValue: 3.0,
      validation: { required: true, min: 0.1, max: 20.0 },
      category: 'Rebate Processing',
      section: 'Calculations',
      requiresRestart: false,
      lastModified: '2024-08-12T16:30:00Z',
      modifiedBy: 'michael.chen@company.com'
    },
    {
      id: 'rebate-processing-schedule',
      name: 'Processing Schedule',
      description: 'When to run automated rebate calculations',
      type: 'select',
      value: 'daily',
      defaultValue: 'weekly',
      options: [
        { label: 'Hourly', value: 'hourly' },
        { label: 'Daily at 2 AM', value: 'daily' },
        { label: 'Weekly (Sunday 2 AM)', value: 'weekly' },
        { label: 'Monthly (1st day, 2 AM)', value: 'monthly' }
      ],
      category: 'Rebate Processing',
      section: 'Scheduling',
      requiresRestart: false,
      lastModified: '2024-08-20T08:00:00Z',
      modifiedBy: 'admin@company.com'
    },

    // Compliance Settings
    {
      id: 'compliance-audit-frequency',
      name: 'Audit Frequency',
      description: 'How often to run compliance audits',
      type: 'select',
      value: 'quarterly',
      defaultValue: 'monthly',
      options: [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annually', value: 'annually' }
      ],
      category: 'Compliance',
      section: 'Auditing',
      requiresRestart: false,
      lastModified: '2024-08-01T12:00:00Z',
      modifiedBy: 'lisa.rodriguez@company.com'
    },
    {
      id: 'compliance-retention-period',
      name: 'Document Retention Period (years)',
      description: 'How long to retain compliance documents',
      type: 'number',
      value: 7,
      defaultValue: 5,
      validation: { required: true, min: 1, max: 20 },
      category: 'Compliance',
      section: 'Document Management',
      requiresRestart: false,
      lastModified: '2024-07-28T15:30:00Z',
      modifiedBy: 'david.kim@company.com'
    },

    // System Settings
    {
      id: 'system-backup-enabled',
      name: 'Automated Backups',
      description: 'Enable automated system backups',
      type: 'boolean',
      value: true,
      defaultValue: true,
      category: 'System',
      section: 'Backup & Recovery',
      requiresRestart: false,
      lastModified: '2024-08-01T00:00:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'system-log-level',
      name: 'Logging Level',
      description: 'System logging verbosity level',
      type: 'select',
      value: 'info',
      defaultValue: 'warn',
      options: [
        { label: 'Error Only', value: 'error' },
        { label: 'Warning & Above', value: 'warn' },
        { label: 'Info & Above', value: 'info' },
        { label: 'Debug (Verbose)', value: 'debug' }
      ],
      category: 'System',
      section: 'Logging',
      isAdvanced: true,
      requiresRestart: true,
      lastModified: '2024-08-15T13:20:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'system-max-upload-size',
      name: 'Maximum Upload Size (MB)',
      description: 'Maximum file size for uploads',
      type: 'number',
      value: 50,
      defaultValue: 25,
      validation: { required: true, min: 1, max: 500 },
      category: 'System',
      section: 'File Management',
      requiresRestart: true,
      lastModified: '2024-08-10T10:00:00Z',
      modifiedBy: 'admin@company.com'
    },

    // Notification Settings
    {
      id: 'notifications-email-enabled',
      name: 'Email Notifications',
      description: 'Enable email notifications for system events',
      type: 'boolean',
      value: true,
      defaultValue: true,
      category: 'Notifications',
      section: 'Email',
      requiresRestart: false,
      lastModified: '2024-08-05T14:15:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'notifications-alert-types',
      name: 'Alert Types',
      description: 'Types of alerts to send notifications for',
      type: 'multiselect',
      value: ['critical', 'high', 'compliance'],
      defaultValue: ['critical'],
      options: [
        { label: 'Critical Alerts', value: 'critical' },
        { label: 'High Priority', value: 'high' },
        { label: 'Medium Priority', value: 'medium' },
        { label: 'Compliance Issues', value: 'compliance' },
        { label: 'System Updates', value: 'system' }
      ],
      category: 'Notifications',
      section: 'Alert Configuration',
      requiresRestart: false,
      lastModified: '2024-08-12T09:30:00Z',
      modifiedBy: 'admin@company.com'
    }
  ];

  private mockAuditLogs: AuditLog[] = [
    {
      id: 'audit-001',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      userId: 'user-001',
      userEmail: 'admin@company.com',
      action: 'update',
      resource: 'System Configuration',
      details: 'Updated rebate auto-approval threshold to $50,000',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 'audit-002',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      userId: 'user-002',
      userEmail: 'sarah.johnson@company.com',
      action: 'access',
      resource: 'User Management',
      details: 'Viewed user list and permissions',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 'audit-003',
      timestamp: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      userId: 'user-003',
      userEmail: 'michael.chen@company.com',
      action: 'create',
      resource: 'Rebate Calculation',
      details: 'Created new rebate calculation for contract MED-2024-001',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 'audit-004',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      userId: 'user-004',
      userEmail: 'lisa.rodriguez@company.com',
      action: 'update',
      resource: 'Compliance Report',
      details: 'Updated compliance report status to completed',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 'audit-005',
      timestamp: new Date(Date.now() - 9000000).toISOString(), // 2.5 hours ago
      userId: 'user-001',
      userEmail: 'admin@company.com',
      action: 'delete',
      resource: 'User Account',
      details: 'Deactivated user account for john.doe@company.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'warning'
    }
  ];

  async getSystemConfigurations(): Promise<SystemConfiguration[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const categories = [...new Set(this.mockSettings.map(s => s.category))];
    
    return categories.map(category => ({
      category,
      settings: this.mockSettings.filter(s => s.category === category)
    }));
  }

  async updateSystemSetting(settingId: string, value: any, userId: string): Promise<SystemSetting> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const settingIndex = this.mockSettings.findIndex(s => s.id === settingId);
    if (settingIndex === -1) {
      throw new Error('Setting not found');
    }

    const setting = { ...this.mockSettings[settingIndex] };
    setting.value = value;
    setting.lastModified = new Date().toISOString();
    setting.modifiedBy = userId;

    this.mockSettings[settingIndex] = setting;

    // Add audit log
    this.mockAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: userId,
      userEmail: userId, // In real implementation, would look up email
      action: 'update',
      resource: 'System Configuration',
      details: `Updated ${setting.name} to ${value}`,
      ipAddress: '192.168.1.100',
      userAgent: 'System',
      status: 'success'
    });

    return setting;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      status: 'healthy',
      uptime: 2592000, // 30 days in seconds
      version: '2.1.4',
      environment: 'production',
      services: [
        {
          name: 'API Server',
          status: 'online',
          uptime: 2592000,
          responseTime: 145,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Database',
          status: 'online',
          uptime: 2592000,
          responseTime: 23,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'File Storage',
          status: 'online',
          uptime: 2588400, // slightly less uptime
          responseTime: 89,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Background Jobs',
          status: 'degraded',
          uptime: 2590800,
          responseTime: 312,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Notification Service',
          status: 'online',
          uptime: 2592000,
          responseTime: 67,
          lastChecked: new Date().toISOString()
        }
      ],
      performance: {
        cpuUsage: 23.5,
        memoryUsage: 67.2,
        diskUsage: 45.8,
        activeConnections: 127
      },
      database: {
        connectionStatus: 'connected',
        queryPerformance: 23.4,
        poolSize: 20,
        activeConnections: 8
      },
      integrations: [
        {
          name: 'Azure AD B2C',
          type: 'api',
          status: 'connected',
          lastSync: new Date(Date.now() - 300000).toISOString(),
          errorCount: 0
        },
        {
          name: 'SMTP Server',
          type: 'service',
          status: 'connected',
          lastSync: new Date(Date.now() - 600000).toISOString(),
          errorCount: 0
        },
        {
          name: 'File Storage API',
          type: 'api',
          status: 'connected',
          lastSync: new Date(Date.now() - 120000).toISOString(),
          errorCount: 2
        }
      ]
    };
  }

  async getAuditLogs(filters?: {
    action?: string;
    resource?: string;
    status?: string;
    limit?: number;
  }): Promise<AuditLog[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let logs = [...this.mockAuditLogs];

    if (filters?.action && filters.action !== 'all') {
      logs = logs.filter(log => log.action === filters.action);
    }

    if (filters?.resource && filters.resource !== 'all') {
      logs = logs.filter(log => log.resource.toLowerCase().includes(filters.resource!.toLowerCase()));
    }

    if (filters?.status && filters.status !== 'all') {
      logs = logs.filter(log => log.status === filters.status);
    }

    // Sort by timestamp (newest first)
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (filters?.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return logs;
  }

  async exportConfiguration(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const config = {
      exportedAt: new Date().toISOString(),
      version: '2.1.4',
      settings: this.mockSettings.reduce((acc, setting) => {
        acc[setting.id] = {
          value: setting.value,
          category: setting.category,
          section: setting.section
        };
        return acc;
      }, {} as Record<string, any>)
    };

    return JSON.stringify(config, null, 2);
  }

  async resetToDefaults(category?: string): Promise<SystemSetting[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const settingsToReset = category 
      ? this.mockSettings.filter(s => s.category === category)
      : this.mockSettings;

    settingsToReset.forEach(setting => {
      setting.value = setting.defaultValue;
      setting.lastModified = new Date().toISOString();
      setting.modifiedBy = 'system-reset';
    });

    // Add audit log
    this.mockAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'system',
      userEmail: 'system@company.com',
      action: 'update',
      resource: 'System Configuration',
      details: category 
        ? `Reset ${category} settings to defaults` 
        : 'Reset all settings to defaults',
      ipAddress: '127.0.0.1',
      userAgent: 'System',
      status: 'warning'
    });

    return settingsToReset;
  }
}

export const mockSystemConfigService = new MockSystemConfigService();