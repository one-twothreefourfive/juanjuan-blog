'use client';

import { useState, useEffect } from 'react';
import ImageCarousel from './components/ImageCarousel';
import Timeline from './components/Timeline';
import MessageBoard from './components/MessageBoard';
import ArtworkGallery from './components/ArtworkGallery';
import CountdownTimer from './components/CountdownTimer';
import MediaPlayer from './components/MediaPlayer';
import { JUANJUAN_BIRTH_DATE } from './constants/dates';

export default function Home() {
  const [age, setAge] = useState('');
  const initialImages = [
    '/images/juanjuan-beach.jpg',
    '/images/107d961c531d5fb6537393195dc045f.jpg',
    '/images/1ed0135d23621812e1e5d1da8cfd72f.jpg',
    '/images/b623ead11d2b2e74c250dc1ce4a242d.jpg',
    '/images/d4a429d139bedbe1ef2ec14795aa170.jpg'
  ];
  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const years = now.getFullYear() - JUANJUAN_BIRTH_DATE.getFullYear();
      const months = now.getMonth() - JUANJUAN_BIRTH_DATE.getMonth();
      const days = now.getDate() - JUANJUAN_BIRTH_DATE.getDate();
      
      let totalMonths = years * 12 + months;
      if (days < 0) {
        totalMonths--;
      }
      
      const displayAge = `${Math.floor(totalMonths / 12)}岁${totalMonths % 12}个月`;
      setAge(displayAge);
    };
    calculateAge();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 基本信息区 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ImageCarousel initialImages={initialImages} />
            <div className="text-center md:text-left space-y-4 flex-1">
              <h1 className="text-3xl font-bold text-gray-800">卷卷</h1>
              <p className="text-lg text-purple-500">{age}</p>
              <p className="text-md text-gray-600">我是一个活泼、可爱、喜欢紫色和粉色的小女孩</p>
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
                <span className="text-4xl">🐼</span>
                <span className="text-lg text-gray-600">鸭子、和企鹅和熊猫</span>
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
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">画画</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">跳舞</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full">科学小实验</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">轮滑</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">自行车</span>
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

        {/* 倒计时区域 */}
        <CountdownTimer />

        {/* 成长时间线 */}
        <Timeline />

        {/* 作品展示区 */}
        <ArtworkGallery />

        {/* 媒体播放器 */}
        <MediaPlayer />

        {/* 留言板 */}
        <MessageBoard />

        {/* 页脚 */}
        <footer className="text-center text-sm text-gray-500">
          <p>Made with ❤️ for 卷卷</p>
        </footer>
      </div>
    </div>
  );
}
