'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [age, setAge] = useState('4岁半');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/juanjuan-beach.jpg',
    '/images/107d961c531d5fb6537393195dc045f.jpg',
    '/images/1ed0135d23621812e1e5d1da8cfd72f.jpg',
    '/images/b623ead11d2b2e74c250dc1ce4a242d.jpg',
    '/images/d4a429d139bedbe1ef2ec14795aa170.jpg'
  ];
  const birthDate = new Date('2020-09-15');

  useEffect(() => {
    // 图片轮播定时器
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const years = now.getFullYear() - birthDate.getFullYear();
      const months = now.getMonth() - birthDate.getMonth();
      const totalMonths = years * 12 + months;
      const displayAge = `${Math.floor(totalMonths / 12)}岁${totalMonths % 12}个月`;
      setAge(displayAge);
    };
    calculateAge();
  }, []);

  const calculateBirthday = () => {
    const now = new Date();
    const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const diff = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 基本信息区 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
              <img
                src={images[currentImageIndex]}
                alt="卷卷的照片"
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="eager"
              />
            </div>
            <div className="text-center md:text-left space-y-4 flex-1">
              <h1 className="text-3xl font-bold text-gray-800">卷卷</h1>
              <p className="text-lg text-purple-500">{age}</p>
              <p className="text-md text-gray-600">我是一个活泼、可爱、喜欢粉色的小女孩</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">开朗</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">活泼</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">可爱</span>
              </div>
            </div>
          </div>
        </div>

        {/* 兴趣爱好区 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-6">我的最爱</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">最喜欢的玩具</h3>
              <div className="flex gap-4 items-center">
                <span className="text-4xl">🦆</span>
                <span className="text-4xl">🐧</span>
                <span className="text-lg text-gray-600">鸭子和企鹅</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">最爱的食物</h3>
              <div className="flex gap-4 items-center">
                <span className="text-4xl">🍮</span>
                <span className="text-lg text-gray-600">钵仔糕</span>
              </div>
            </div>
          </div>
        </div>

        {/* 成长记录区 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-6">成长记录</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">我的幼儿园</h3>
              <p className="text-lg text-gray-600">爱贝贝</p>
              
              <h3 className="text-xl font-semibold text-purple-500 mt-6">我的小小梦想</h3>
              <p className="text-lg text-gray-600">长大后想当一名老师 👩‍🏫</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">我会做的有趣事情</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">跳儿歌舞蹈</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">科学小实验</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full">轮滑</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">自行车</span>
              </div>
            </div>
          </div>
        </div>

        {/* 互动区 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-6">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">爸爸妈妈的联系方式</h3>
              <p className="text-lg text-gray-600">电话：152****6353</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-500">距离下次生日还有</h3>
              <p className="text-2xl font-bold text-pink-500">{calculateBirthday()}天</p>
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="flex justify-around pt-4">
          <div className="animate-bounce">
            <span className="text-3xl">🎀</span>
          </div>
          <div className="animate-bounce delay-100">
            <span className="text-3xl">🌸</span>
          </div>
          <div className="animate-bounce delay-200">
            <span className="text-3xl">✨</span>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="text-center text-sm text-gray-500">
          <p>Made with ❤️ for 卷卷</p>
        </footer>
      </div>
    </div>
  );
}
