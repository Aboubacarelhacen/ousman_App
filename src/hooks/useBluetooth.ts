import { useState, useEffect } from 'react';
import bleManager from '../services/bluetooth/bleManager';

/**
 * Custom hook to manage Bluetooth connection state for the UI.
 */
export const useBluetooth = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    bleManager.init();
    return () => {
      bleManager.disconnect();
    };
  }, []);

  const connectToDevice = () => {
    setIsScanning(true);
    bleManager.scanAndConnect();
    // Simulate connection
    setTimeout(() => setIsScanning(false), 3000);
  };

  return { isScanning, connectToDevice };
};
