import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

export type BiometricResult = {
  success: boolean;
  error?: string;
};

export class BiometricService {
  private readonly rnBiometrics: ReactNativeBiometrics;

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics();
  }

  async isAvailable(): Promise<{ available: boolean; biometryType?: BiometryType }> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      return { available, biometryType };
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return { available: false };
    }
  }

  async authenticate(
    promptMessage: string = 'Authenticate to continue',
  ): Promise<BiometricResult> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });

      return { success };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Biometric authentication failed',
      };
    }
  }

  async createKeys(): Promise<{ publicKey: string } | null> {
    try {
      const { publicKey } = await this.rnBiometrics.createKeys();
      return { publicKey };
    } catch (error) {
      console.error('Error creating biometric keys:', error);
      return null;
    }
  }
}

export const biometricService = new BiometricService();
