'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

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

  const verifyAnswer = () => {
    if (answer.trim().toLowerCase() === '谭采薇') {
      setIsDialogOpen(false);
      setError('');
      if (fileInput && fileInput.files) {
        processFiles(fileInput.files);
      }
    } else {
      setError('答案不正确，请重试');
    }
    setAnswer('');
  };

  const processFiles = (files: FileList) => {
    try {
      Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('图片大小不能超过5MB');
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            setImages(prevImages => [...prevImages, reader.result as string]);
          } catch (err) {
            console.error('保存图片时出错:', err);
            setError('保存图片时出错，请重试');
          }
        };
        reader.onerror = () => {
          setError('读取图片时出错，请重试');
        };
        reader.readAsDataURL(file);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理图片时出错');
    }
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileInput(event.target);
    setIsDialogOpen(true);
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
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
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

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setError('');
          setAnswer('');
          if (fileInput) {
            fileInput.value = '';
          }
        }}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              请回答问题以继续
            </Dialog.Title>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">我的真实姓名叫什么？</p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="请输入答案"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  setError('');
                  setAnswer('');
                  if (fileInput) {
                    fileInput.value = '';
                  }
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                取消
              </button>
              <button
                onClick={verifyAnswer}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}