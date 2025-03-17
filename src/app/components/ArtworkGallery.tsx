'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: 'drawing' | 'handcraft';
  date: string;
}

const artworkData: Artwork[] = [
  {
    id: 1,
    title: '我的小猫咪',
    description: '卷卷最喜欢的小猫咪水彩画',
    imageUrl: '/images/artworks/cat-drawing.jpg',
    category: 'drawing',
    date: '2023-12-15'
  },
  {
    id: 2,
    title: '彩虹贴画',
    description: '用彩纸制作的美丽彩虹',
    imageUrl: '/images/artworks/rainbow-craft.jpg',
    category: 'handcraft',
    date: '2023-11-20'
  }
];

const ArtworkGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'drawing' | 'handcraft'>('all');

  const filteredArtworks = selectedCategory === 'all'
    ? artworkData
    : artworkData.filter(artwork => artwork.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">卷卷的作品展示</h2>
      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          全部作品
        </button>
        <button
          onClick={() => setSelectedCategory('drawing')}
          className={`px-4 py-2 rounded-full ${selectedCategory === 'drawing' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          绘画作品
        </button>
        <button
          onClick={() => setSelectedCategory('handcraft')}
          className={`px-4 py-2 rounded-full ${selectedCategory === 'handcraft' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        >
          手工作品
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">{artwork.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{artwork.date}</p>
              <p className="text-gray-700">{artwork.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkGallery;