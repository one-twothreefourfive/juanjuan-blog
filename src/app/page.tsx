import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
        {/* 头像区域 */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
            <div className="w-full h-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-4xl font-bold text-white">
              卷卷
            </div>
          </div>
        </div>

        {/* 个人信息区域 */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">谭采薇</h1>
          <p className="text-lg font-medium text-pink-500">小名：卷卷</p>
          <p className="text-md text-purple-500">年龄：4岁半</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">开朗</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">活泼</span>
            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">可爱</span>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="flex justify-around pt-4">
          <div className="animate-bounce">
            <span className="text-2xl">🎀</span>
          </div>
          <div className="animate-bounce delay-100">
            <span className="text-2xl">🌸</span>
          </div>
          <div className="animate-bounce delay-200">
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Made with ❤️ for 卷卷</p>
      </footer>
    </div>
  );
}
