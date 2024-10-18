import React, { useState, useEffect } from 'react';
import { Rss, Settings, RefreshCw, Trash2 } from 'lucide-react';
import FeedList from './components/FeedList';
import AddFeed from './components/AddFeed';
import SettingsModal from './components/SettingsModal';
import { Feed } from './types';

function App() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['feeds', 'isFirstTime'], (result) => {
      if (result.feeds) {
        setFeeds(result.feeds);
      }
      if (result.isFirstTime !== undefined) {
        setIsFirstTime(result.isFirstTime);
      }
    });
  }, []);

  const addFeed = (url: string) => {
    // Implement feed addition logic
  };

  const removeFeed = (url: string) => {
    // Implement feed removal logic
  };

  const refreshFeeds = () => {
    // Implement feed refresh logic
  };

  return (
    <div className="w-96 min-h-[600px] bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Rss className="mr-2" /> RSS Feed Manager
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Settings"
        >
          <Settings />
        </button>
      </header>

      {isFirstTime && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p className="font-bold">Welcome to RSS Feed Manager!</p>
          <p>Add your first RSS feed to get started.</p>
        </div>
      )}

      <AddFeed onAdd={addFeed} />

      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-semibold">Your Feeds</h2>
        <button
          onClick={refreshFeeds}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Refresh feeds"
        >
          <RefreshCw />
        </button>
      </div>

      {feeds.length === 0 ? (
        <p className="text-gray-500 text-center my-8">No feeds added yet. Add your first feed above!</p>
      ) : (
        <FeedList feeds={feeds} onRemove={removeFeed} />
      )}

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;