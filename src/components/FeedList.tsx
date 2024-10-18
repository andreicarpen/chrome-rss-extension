import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Feed } from '../types';

interface FeedListProps {
  feeds: Feed[];
  onRemove: (url: string) => void;
}

const FeedList: React.FC<FeedListProps> = ({ feeds, onRemove }) => {
  return (
    <ul className="space-y-4">
      {feeds.map((feed) => (
        <li key={feed.url} className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{feed.title}</h3>
            <button
              onClick={() => onRemove(feed.url)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${feed.title}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{feed.description}</p>
          <ul className="space-y-2">
            {feed.items.slice(0, 3).map((item) => (
              <li key={item.guid} className="text-sm">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {item.title}
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default FeedList;