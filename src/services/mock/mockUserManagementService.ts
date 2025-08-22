export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
  permissions: Permission[];
  avatar?: string;
  phoneNumber?: string;
  manager?: string;
  location: string;
  timezone: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'analyst' | 'viewer';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'contracts' | 'rebates' | 'analytics' | 'compliance' | 'settings' | 'users';
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface UserSession {
  id: string;
  userId: string;
  loginTime: string;
  lastActivity: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  status: 'active' | 'expired';
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}

class MockUserManagementService {
  private mockPermissions: Permission[] = [
    {
      id: 'perm-contracts-read',
      name: 'View Contracts',
      description: 'View contract details and lists',
      category: 'contracts',
      actions: ['read']
    },
    {
      id: 'perm-contracts-write',
      name: 'Manage Contracts',
      description: 'Create, edit, and upload contracts',
      category: 'contracts',
      actions: ['read', 'write']
    },
    {
      id: 'perm-contracts-approve',
      name: 'Approve Contracts',
      description: 'Approve and finalize contracts',
      category: 'contracts',
      actions: ['read', 'write', 'approve']
    },
    {
      id: 'perm-rebates-read',
      name: 'View Rebates',
      description: 'View rebate calculations and reports',
      category: 'rebates',
      actions: ['read']
    },
    {
      id: 'perm-rebates-write',
      name: 'Manage Rebates',
      description: 'Create and modify rebate calculations',
      category: 'rebates',
      actions: ['read', 'write']
    },
    {
      id: 'perm-rebates-approve',
      name: 'Approve Rebates',
      description: 'Approve rebate payments and calculations',
      category: 'rebates',
      actions: ['read', 'write', 'approve']
    },
    {
      id: 'perm-analytics-read',
      name: 'View Analytics',
      description: 'Access analytics dashboards and reports',
      category: 'analytics',
      actions: ['read']
    },
    {
      id: 'perm-compliance-read',
      name: 'View Compliance',
      description: 'View compliance reports and findings',
      category: 'compliance',
      actions: ['read']
    },
    {
      id: 'perm-compliance-write',
      name: 'Manage Compliance',
      description: 'Create and manage compliance reports',
      category: 'compliance',
      actions: ['read', 'write']
    },
    {
      id: 'perm-settings-read',
      name: 'View Settings',
      description: 'View system settings and configuration',
      category: 'settings',
      actions: ['read']
    },
    {
      id: 'perm-settings-write',
      name: 'Manage Settings',
      description: 'Modify system settings and configuration',
      category: 'settings',
      actions: ['read', 'write']
    },
    {
      id: 'perm-users-read',
      name: 'View Users',
      description: 'View user accounts and roles',
      category: 'users',
      actions: ['read']
    },
    {
      id: 'perm-users-write',
      name: 'Manage Users',
      description: 'Create, edit, and manage user accounts',
      category: 'users',
      actions: ['read', 'write', 'delete']
    }
  ];

  private mockRoles: UserRole[] = [
    {
      id: 'role-admin',
      name: 'System Administrator',
      description: 'Full system access with all permissions',
      level: 'admin',
      permissions: this.mockPermissions
    },
    {
      id: 'role-manager',
      name: 'Rebate Manager',
      description: 'Manages rebate processes and approves calculations',
      level: 'manager',
      permissions: this.mockPermissions.filter(p => 
        p.category !== 'users' && 
        (p.category !== 'settings' || p.actions.includes('read'))
      )
    },
    {
      id: 'role-analyst',
      name: 'Financial Analyst',
      description: 'Analyzes rebate data and creates reports',
      level: 'analyst',
      permissions: this.mockPermissions.filter(p => 
        !p.actions.includes('delete') && 
        p.category !== 'users' &&
        p.category !== 'settings'
      )
    },
    {
      id: 'role-viewer',
      name: 'Report Viewer',
      description: 'Read-only access to reports and dashboards',
      level: 'viewer',
      permissions: this.mockPermissions.filter(p => 
        p.actions.length === 1 && p.actions[0] === 'read'
      )
    }
  ];

  private mockUsers: User[] = [
    {
      id: 'user-001',
      email: 'demo.user@company.com',
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
      role: this.mockRoles[0], // Admin
      department: 'Information Technology',
      status: 'active',
      createdAt: '2024-01-15T00:00:00Z',
      lastLoginAt: new Date().toISOString(),
      permissions: this.mockRoles[0].permissions,
      phoneNumber: '+1 (555) 123-4567',
      manager: 'John Smith',
      location: 'New York, NY',
      timezone: 'America/New_York'
    },
    {
      id: 'user-002',
      email: 'sarah.johnson@company.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      fullName: 'Sarah Johnson',
      role: this.mockRoles[1], // Manager
      department: 'Finance',
      status: 'active',
      createdAt: '2024-02-01T00:00:00Z',
      lastLoginAt: '2024-08-22T08:30:00Z',
      permissions: this.mockRoles[1].permissions,
      phoneNumber: '+1 (555) 234-5678',
      manager: 'Michael Davis',
      location: 'Chicago, IL',
      timezone: 'America/Chicago'
    },
    {
      id: 'user-003',
      email: 'michael.chen@company.com',
      firstName: 'Michael',
      lastName: 'Chen',
      fullName: 'Michael Chen',
      role: this.mockRoles[2], // Analyst
      department: 'Finance',
      status: 'active',
      createdAt: '2024-03-10T00:00:00Z',
      lastLoginAt: '2024-08-21T14:45:00Z',
      permissions: this.mockRoles[2].permissions,
      phoneNumber: '+1 (555) 345-6789',
      manager: 'Sarah Johnson',
      location: 'San Francisco, CA',
      timezone: 'America/Los_Angeles'
    },
    {
      id: 'user-004',
      email: 'lisa.rodriguez@company.com',
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      fullName: 'Lisa Rodriguez',
      role: this.mockRoles[2], // Analyst
      department: 'Compliance',
      status: 'active',
      createdAt: '2024-03-15T00:00:00Z',
      lastLoginAt: '2024-08-22T09:15:00Z',
      permissions: this.mockRoles[2].permissions,
      phoneNumber: '+1 (555) 456-7890',
      manager: 'David Kim',
      location: 'Austin, TX',
      timezone: 'America/Chicago'
    },
    {
      id: 'user-005',
      email: 'david.kim@company.com',
      firstName: 'David',
      lastName: 'Kim',
      fullName: 'David Kim',
      role: this.mockRoles[1], // Manager
      department: 'Compliance',
      status: 'active',
      createdAt: '2024-01-20T00:00:00Z',
      lastLoginAt: '2024-08-21T16:20:00Z',
      permissions: this.mockRoles[1].permissions,
      phoneNumber: '+1 (555) 567-8901',
      manager: 'Michael Davis',
      location: 'Seattle, WA',
      timezone: 'America/Los_Angeles'
    },
    {
      id: 'user-006',
      email: 'emma.thompson@company.com',
      firstName: 'Emma',
      lastName: 'Thompson',
      fullName: 'Emma Thompson',
      role: this.mockRoles[3], // Viewer
      department: 'Procurement',
      status: 'active',
      createdAt: '2024-04-01T00:00:00Z',
      lastLoginAt: '2024-08-20T11:30:00Z',
      permissions: this.mockRoles[3].permissions,
      phoneNumber: '+1 (555) 678-9012',
      manager: 'Sarah Johnson',
      location: 'Boston, MA',
      timezone: 'America/New_York'
    },
    {
      id: 'user-007',
      email: 'james.wilson@company.com',
      firstName: 'James',
      lastName: 'Wilson',
      fullName: 'James Wilson',
      role: this.mockRoles[2], // Analyst
      department: 'Finance',
      status: 'inactive',
      createdAt: '2024-05-15T00:00:00Z',
      lastLoginAt: '2024-08-01T10:00:00Z',
      permissions: this.mockRoles[2].permissions,
      phoneNumber: '+1 (555) 789-0123',
      manager: 'Sarah Johnson',
      location: 'Denver, CO',
      timezone: 'America/Denver'
    },
    {
      id: 'user-008',
      email: 'maria.gonzalez@company.com',
      firstName: 'Maria',
      lastName: 'Gonzalez',
      fullName: 'Maria Gonzalez',
      role: this.mockRoles[2], // Analyst
      department: 'Finance',
      status: 'pending',
      createdAt: '2024-08-20T00:00:00Z',
      permissions: this.mockRoles[2].permissions,
      phoneNumber: '+1 (555) 890-1234',
      manager: 'Sarah Johnson',
      location: 'Miami, FL',
      timezone: 'America/New_York'
    }
  ];

  async getUsers(filters?: {
    status?: string;
    role?: string;
    department?: string;
  }): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    let users = [...this.mockUsers];

    if (filters?.status && filters.status !== 'all') {
      users = users.filter(user => user.status === filters.status);
    }

    if (filters?.role && filters.role !== 'all') {
      users = users.filter(user => user.role.id === filters.role);
    }

    if (filters?.department && filters.department !== 'all') {
      users = users.filter(user => user.department === filters.department);
    }

    return users.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getUser(id: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const user = this.mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserRoles(): Promise<UserRole[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockRoles;
  }

  async getPermissions(): Promise<Permission[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockPermissions;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'permissions' | 'fullName'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const role = this.mockRoles.find(r => r.id === userData.role.id);
    if (!role) {
      throw new Error('Invalid role specified');
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      fullName: `${userData.firstName} ${userData.lastName}`,
      createdAt: new Date().toISOString(),
      permissions: role.permissions,
      role: role
    };

    this.mockUsers.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const user = { ...this.mockUsers[userIndex], ...updates };
    if (updates.firstName || updates.lastName) {
      user.fullName = `${user.firstName} ${user.lastName}`;
    }

    if (updates.role) {
      user.permissions = updates.role.permissions;
    }

    this.mockUsers[userIndex] = user;
    return user;
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    inactiveUsers: number;
    usersByRole: Array<{ role: string; count: number }>;
    usersByDepartment: Array<{ department: string; count: number }>;
    recentActivity: Array<{ date: string; logins: number; newUsers: number }>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const totalUsers = this.mockUsers.length;
    const activeUsers = this.mockUsers.filter(u => u.status === 'active').length;
    const pendingUsers = this.mockUsers.filter(u => u.status === 'pending').length;
    const inactiveUsers = this.mockUsers.filter(u => u.status === 'inactive').length;

    const roleMap = new Map<string, number>();
    const deptMap = new Map<string, number>();

    this.mockUsers.forEach(user => {
      roleMap.set(user.role.name, (roleMap.get(user.role.name) || 0) + 1);
      deptMap.set(user.department, (deptMap.get(user.department) || 0) + 1);
    });

    return {
      totalUsers,
      activeUsers,
      pendingUsers,
      inactiveUsers,
      usersByRole: Array.from(roleMap.entries()).map(([role, count]) => ({ role, count })),
      usersByDepartment: Array.from(deptMap.entries()).map(([department, count]) => ({ department, count })),
      recentActivity: [
        { date: '2024-08-18', logins: 23, newUsers: 0 },
        { date: '2024-08-19', logins: 28, newUsers: 1 },
        { date: '2024-08-20', logins: 31, newUsers: 0 },
        { date: '2024-08-21', logins: 26, newUsers: 0 },
        { date: '2024-08-22', logins: 19, newUsers: 1 }
      ]
    };
  }
}

export const mockUserManagementService = new MockUserManagementService();