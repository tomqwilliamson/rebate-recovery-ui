import BaseApiService from './base.api';
import { User } from '@types/user.types';

class AuthApiService extends BaseApiService {
  async getProfile(): Promise<User> {
    const response = await this.get<User>('/auth/profile');
    return response.data;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await this.put<User>('/auth/profile', updates);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      refreshToken
    });
    return response.data;
  }
}

export const authApi = new AuthApiService();