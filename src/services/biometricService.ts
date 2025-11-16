import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export type BiometricResult = {
  success: boolean;
  error?: string;
};

export const biometricService = {
  /**
   * Check if biometric authentication is available on the device
   */
  isAvailable: async (): Promise<{ available: boolean; biometryType?: BiometryType }> => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      return { available, biometryType };
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return { available: false };
    }
  },

  /**
   * Prompt user for biometric authentication
   */
  authenticate: async (
    promptMessage: string = 'Authenticate to continue',
  ): Promise<BiometricResult> => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
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
  },

  /**
   * Create biometric keys for encryption (optional, for advanced use cases)
   */
  createKeys: async (): Promise<{ publicKey: string } | null> => {
    try {
      const { publicKey } = await rnBiometrics.createKeys();
      return { publicKey };
    } catch (error) {
      console.error('Error creating biometric keys:', error);
      return null;
    }
  },
};
