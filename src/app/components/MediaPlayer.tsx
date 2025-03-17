'use client';

import React, { useState } from 'react';

interface MediaItem {
  id: number;
  title: string;
  type: 'song' | 'story';
  audioUrl: string;
  thumbnail: string;
  duration: string;
}

const mediaData: MediaItem[] = [
  {
    id: 1,
    title: '两只老虎',
    type: 'song',
    audioUrl: '/audio/songs/two-tigers.mp3',
    thumbnail: '/images/media/two-tigers.jpg',
    duration: '2:30'
  },
  {
    id: 2,
    title: '小蝌蚪找妈妈',
    type: 'story',
    audioUrl: '/audio/stories/tadpole.mp3',
    thumbnail: '/images/media/tadpole.jpg',
    duration: '5:00'
  }
];

const MediaPlayer: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'song' | 'story'>('all');
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const filteredMedia = selectedType === 'all'
    ? mediaData
    : mediaData.filter(item => item.type === selectedType);

  const handlePlay = (id: number) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">卷卷最爱的儿歌和故事</h2>
      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-full ${selectedType === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          全部
        </button>
        <button
          onClick={() => setSelectedType('song')}
          className={`px-4 py-2 rounded-full ${selectedType === 'song' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          儿歌
        </button>
        <button
          onClick={() => setSelectedType('story')}
          className={`px-4 py-2 rounded-full ${selectedType === 'story' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          故事
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 flex items-center space-x-4">
              <div className="w-16 h-16 relative flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-pink-600">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.type === 'song' ? '儿歌' : '故事'} · {item.duration}</p>
              </div>
              <button
                onClick={() => handlePlay(item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${currentPlaying === item.id ? 'bg-pink-500' : 'bg-gray-200'}`}
              >
                <svg
                  className={`w-6 h-6 ${currentPlaying === item.id ? 'text-white' : 'text-gray-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {currentPlaying === item.id ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m-9-3a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  )}
                </svg>
              </button>
            </div>
            {currentPlaying === item.id && (
              <div className="p-4 border-t">
                <audio
                  src={item.audioUrl}
                  controls
                  className="w-full"
                  autoPlay
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPlayer;