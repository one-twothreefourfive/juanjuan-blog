'use client';

import React from 'react';
import Image from 'next/image';
import { JUANJUAN_BIRTH_DATE } from '../constants/dates';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const timelineData: TimelineEvent[] = [
  {
    date: '2020-09-15',
    title: '卷卷出生啦',
    description: '一个可爱的小天使降临了',
    imageUrl: '/images/juanjuan-birth.jpg'
  },
  {
    date: '2021-08-15',
    title: '周岁生日',
    description: '第一次过生日，吃到了生日蛋糕',
    imageUrl: '/images/juanjuan-birthday.jpg'
  },
  {
    date: '2022-09-01',
    title: '上幼儿园啦',
    description: '第一天上幼儿园，认识了新朋友',
    imageUrl: '/images/juanjuan-kindergarten.jpg'
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">卷卷的成长历程</h2>
      <div className="relative">
        {/* 时间轴中线 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200"></div>
        
        {timelineData.map((event, index) => (
          <div key={index} className={`mb-8 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* 时间点 */}
            <div className="w-1/2 px-4 flex justify-end">
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm">
                <h3 className="text-xl font-semibold text-pink-600 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
                {event.imageUrl && (
                  <div className="mt-4 relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* 时间轴装饰 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;