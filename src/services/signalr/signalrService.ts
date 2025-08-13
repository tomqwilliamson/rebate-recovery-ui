import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

class SignalRService {
  private connection: HubConnection | null = null;

  async startConnection(hubUrl: string): Promise<void> {
    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log('SignalR Connected');
    } catch (error) {
      console.error('SignalR Connection Error:', error);
    }
  }

  async stopConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  onContractProcessingUpdate(callback: (data: any) => void): void {
    if (this.connection) {
      this.connection.on('ContractProcessingUpdate', callback);
    }
  }

  onRebateCalculationComplete(callback: (data: any) => void): void {
    if (this.connection) {
      this.connection.on('RebateCalculationComplete', callback);
    }
  }

  offContractProcessingUpdate(): void {
    if (this.connection) {
      this.connection.off('ContractProcessingUpdate');
    }
  }

  offRebateCalculationComplete(): void {
    if (this.connection) {
      this.connection.off('RebateCalculationComplete');
    }
  }
}

export const signalrService = new SignalRService();