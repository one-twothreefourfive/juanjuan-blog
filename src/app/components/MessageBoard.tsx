'use client';

import React, { useState } from 'react';

interface Message {
  id: number;
  name: string;
  content: string;
  timestamp: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({ name: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name.trim() || !newMessage.content.trim()) return;

    const message: Message = {
      id: Date.now(),
      name: newMessage.name,
      content: newMessage.content,
      timestamp: new Date().toLocaleString('zh-CN')
    };

    setMessages([message, ...messages]);
    setNewMessage({ name: '', content: '' });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">给卷卷留言</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">你的名字</label>
          <input
            type="text"
            id="name"
            value={newMessage.name}
            onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            maxLength={20}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">留言内容</label>
          <textarea
            id="message"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={4}
            maxLength={200}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300"
        >
          发送祝福
        </button>
      </form>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-pink-600">{message.name}</h3>
              <span className="text-sm text-gray-500">{message.timestamp}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;