import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [refreshInterval, setRefreshInterval] = useState(15);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['refreshInterval', 'notifications'], (result) => {
      if (result.refreshInterval) setRefreshInterval(result.refreshInterval);
      if (result.notifications !== undefined) setNotifications(result.notifications);
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.local.set({ refreshInterval, notifications }, () => {
      chrome.runtime.sendMessage({ action: 'updateSettings' });
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="refreshInterval" className="block mb-2">
            Refresh Interval (minutes):
          </label>
          <input
            type="number"
            id="refreshInterval"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            min="1"
            max="60"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
        <button
          onClick={saveSettings}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;