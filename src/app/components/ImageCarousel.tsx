'use client';

import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  initialImages: string[];
}

export default function ImageCarousel({ initialImages }: ImageCarouselProps) {
  const [images, setImages] = useState<string[]>(() => {
    // 尝试从localStorage获取保存的图片，如果没有则使用初始图片
    if (typeof window !== 'undefined') {
      const savedImages = localStorage.getItem('carouselImages');
      return savedImages ? JSON.parse(savedImages) : initialImages;
    }
    return initialImages;
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 图片轮播定时器
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // 保存图片到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carouselImages', JSON.stringify(images));
    }
  }, [images]);

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 删除图片
  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt="卷卷的照片"
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="eager"
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="px-4 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition-colors">
            上传图片
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`图片 ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}