import { User } from '../../types/user.types';
import { tokenService } from './tokenService';

class MockAuthService {
  private mockUsers: User[] = [
    {
      id: 'demo-user-1',
      email: 'demo.user@company.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'admin',
      department: 'Finance',
      lastLoginAt: new Date().toISOString(),
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true,
    },
    {
      id: 'demo-user-2',
      email: 'john.smith@company.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'contract_manager',
      department: 'Contracts',
      lastLoginAt: new Date(Date.now() - 86400000).toISOString(),
      createdAt: '2024-01-15T00:00:00Z',
      isActive: true,
    },
  ];

  async login(email?: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = email 
      ? this.mockUsers.find(u => u.email === email) || this.mockUsers[0]
      : this.mockUsers[0];

    // Generate mock JWT tokens
    const accessToken = this.generateMockJWT(user);
    const refreshToken = 'mock-refresh-token-' + Date.now();

    // Store tokens
    tokenService.setTokens(accessToken, refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logout(): Promise<void> {
    tokenService.clearTokens();
  }

  getCurrentUser(): User | null {
    const token = tokenService.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return this.mockUsers.find(u => u.id === payload.sub) || null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = tokenService.getAccessToken();
    if (!token) return false;
    return !tokenService.isTokenExpired(token);
  }

  private generateMockJWT(user: User): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      department: user.department,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    };

    // Create a mock JWT (not cryptographically secure, just for demo)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'mock-signature';

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}

export const mockAuthService = new MockAuthService();