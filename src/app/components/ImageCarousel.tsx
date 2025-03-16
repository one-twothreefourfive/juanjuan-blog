'use client';

import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ImageCarouselProps {
  initialImages: string[];
}

export default function ImageCarousel({ initialImages }: ImageCarouselProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // 在组件挂载后从localStorage加载图片
    if (typeof window !== 'undefined') {
      const savedImages = localStorage.getItem('carouselImages');
      if (savedImages) {
        try {
          const parsedImages = JSON.parse(savedImages);
          setImages(parsedImages);
        } catch (err) {
          console.error('加载保存的图片失败:', err);
          localStorage.removeItem('carouselImages');
        }
      }
    }
  }, []);

  useEffect(() => {
    // 图片轮播定时器
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [images, isPlaying]);

  // 保存图片到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && images !== initialImages) {
      try {
        localStorage.setItem('carouselImages', JSON.stringify(images));
      } catch (err) {
        console.error('保存图片到localStorage失败:', err);
      }
    }
  }, [images, initialImages]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg cursor-pointer"
           onClick={() => handleImageClick(currentImageIndex)}>
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt="卷卷的照片"
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="eager"
          />
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          {isPlaying ? '暂停' : '播放'}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={`缩略图 ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Transition appear show={isPreviewOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsPreviewOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="relative">
                  <img
                    src={images[selectedImageIndex]}
                    alt={`图片 ${selectedImageIndex + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}