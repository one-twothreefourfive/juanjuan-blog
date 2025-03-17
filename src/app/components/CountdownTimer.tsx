'use client';

import React, { useState, useEffect } from 'react';
import { JUANJUAN_BIRTH_DATE } from '../constants/dates';

interface Holiday {
  name: string;
  date: string;
  message: string;
}

const holidays: Holiday[] = [
  {
    name: '春节',
    date: '2024-02-10',
    message: '新年快乐！卷卷要开开心心的！'
  },
  {
    name: '儿童节',
    date: '2024-06-01',
    message: '六一儿童节快乐！卷卷要永远保持童真！'
  }
];

const CountdownTimer: React.FC = () => {
  const [daysUntilBirthday, setDaysUntilBirthday] = useState<number>(0);
  const [nextHoliday, setNextHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const birthday = new Date(currentYear, JUANJUAN_BIRTH_DATE.getMonth(), JUANJUAN_BIRTH_DATE.getDate());

      if (today > birthday) {
        birthday.setFullYear(currentYear + 1);
      }

      const diffTime = birthday.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilBirthday(diffDays);

      // 计算下一个节日
      const upcomingHolidays = holidays
        .map(holiday => ({
          ...holiday,
          date: new Date(holiday.date)
        }))
        .filter(holiday => holiday.date > today)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      if (upcomingHolidays.length > 0) {
        setNextHoliday({
          name: upcomingHolidays[0].name,
          date: upcomingHolidays[0].date.toLocaleDateString('zh-CN'),
          message: upcomingHolidays[0].message
        });
      }
    };

    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60); // 每小时更新一次

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-pink-600">特别的日子</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">距离卷卷的生日还有</h3>
          <div className="text-4xl font-bold text-pink-500 animate-pulse">
            {daysUntilBirthday}天
          </div>
        </div>

        {nextHoliday && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">即将到来的节日</h3>
            <div className="space-y-2">
              <p className="text-lg font-medium text-pink-500">{nextHoliday.name}</p>
              <p className="text-gray-600">{nextHoliday.date}</p>
              <p className="text-gray-700 mt-2">{nextHoliday.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;