import { Configuration, PublicClientApplication } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'your-client-id',
    authority: import.meta.env.VITE_AZURE_AUTHORITY || 'https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_signin',
    knownAuthorities: [import.meta.env.VITE_AZURE_KNOWN_AUTHORITY || 'your-tenant.b2clogin.com'],
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

class AuthService {
  private msalInstance: PublicClientApplication;

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async initialize() {
    await this.msalInstance.initialize();
  }

  getInstance() {
    return this.msalInstance;
  }

  async login() {
    try {
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
      return loginResponse;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout() {
    await this.msalInstance.logoutPopup();
  }

  async getAccessToken() {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const silentRequest = {
      ...loginRequest,
      account: accounts[0],
    };

    try {
      const response = await this.msalInstance.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      throw error;
    }
  }

  getCurrentUser() {
    const accounts = this.msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  }
}

export const authService = new AuthService();