import { Feed, Settings } from './types';

let settings: Settings = {
  refreshInterval: 15,
  notifications: true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isFirstTime: true });
  loadSettings();
  scheduleNextUpdate();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshFeeds') {
    refreshFeeds();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSettings') {
    loadSettings();
    scheduleNextUpdate();
  }
});

function loadSettings() {
  chrome.storage.local.get(['refreshInterval', 'notifications'], (result) => {
    settings = {
      refreshInterval: result.refreshInterval || 15,
      notifications: result.notifications !== undefined ? result.notifications : true,
    };
  });
}

function scheduleNextUpdate() {
  chrome.alarms.create('refreshFeeds', {
    periodInMinutes: settings.refreshInterval,
  });
}

async function refreshFeeds() {
  const { feeds } = await chrome.storage.local.get('feeds');
  if (!feeds) return;

  const updatedFeeds: Feed[] = [];
  let hasNewItems = false;

  for (const feed of feeds) {
    try {
      const response = await fetch(feed.url);
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        pubDate: item.querySelector('pubDate')?.textContent || '',
        description: item.querySelector('description')?.textContent || '',
        guid: item.querySelector('guid')?.textContent || '',
      }));

      if (items.length > 0 && items[0].guid !== feed.items[0]?.guid) {
        hasNewItems = true;
      }

      updatedFeeds.push({
        ...feed,
        items,
      });
    } catch (error) {
      console.error(`Error refreshing feed ${feed.url}:`, error);
      updatedFeeds.push(feed);
    }
  }

  await chrome.storage.local.set({ feeds: updatedFeeds });

  if (hasNewItems && settings.notifications) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'New RSS Items',
      message: 'There are new items in your RSS feeds!',
    });
  }
}