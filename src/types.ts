export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
}

export interface Feed {
  url: string;
  title: string;
  description: string;
  items: FeedItem[];
}

export interface Settings {
  refreshInterval: number;
  notifications: boolean;
}