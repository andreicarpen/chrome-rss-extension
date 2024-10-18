import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddFeedProps {
  onAdd: (url: string) => void;
}

const AddFeed: React.FC<AddFeedProps> = ({ onAdd }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAdd(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter RSS feed URL"
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Add feed"
      >
        <PlusCircle />
      </button>
    </form>
  );
};

export default AddFeed;