# JuanJuan Blog

## SSH 配置指南

### 1. 生成 SSH 密钥对

1. 打开终端（PowerShell 或 Git Bash），运行以下命令（替换为你的 GitHub 邮箱）：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. 按回车接受默认文件位置（`~/.ssh/id_ed25519`）
3. 输入密码短语（可选，建议设置）

### 2. 添加 SSH 公钥到 GitHub

1. 复制 SSH 公钥内容：
   ```bash
   # Windows PowerShell
   Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub" | Set-Clipboard
   ```

2. 访问 [GitHub Settings](https://github.com/settings/keys)
3. 点击 "New SSH key"
4. 填写标题（如：Personal Laptop）
5. 粘贴公钥内容
6. 点击 "Add SSH key"

### 3. 测试 SSH 连接

```bash
ssh -T git@github.com
```

### 4. 更新仓库 Remote URL

```bash
# 查看当前 remote
git remote -v

# 更新为 SSH URL
git remote set-url origin git@github.com:你的用户名/juanjuan-blog.git

# 验证更新
git remote -v
```

### 5. 推送代码

```bash
git push -u origin main
```

## 注意事项

- 首次连接 GitHub 时可能会提示确认主机真实性，输入 "yes" 确认
- 如果设置了密码短语，推送时需要输入
- 确保 `.ssh` 目录和密钥文件权限正确

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 卷卷个人主页实现要求

### 页面结构

1. 基本信息区
   - 个人头像（圆形，带边框效果）
   - 姓名和年龄（自动计算）
   - 个性标签（开朗、活泼、可爱）

2. 兴趣爱好区
   - 最喜欢的玩具（鸭子和企鹅）
   - 最爱的食物（钵仔糕）
   - 使用emoji图标增加趣味性

3. 成长记录区
   - 幼儿园信息
   - 小小梦想
   - 个人技能展示（跳舞、科学实验、轮滑等）

4. 互动区
   - 家长联系方式
   - 倒计时显示距离下次生日的天数
   - 装饰性动画元素

### 技术实现

1. 框架与工具
   - Next.js 15.2.1 框架
   - React 19.0.0
   - TypeScript 支持
   - Tailwind CSS 用于样式设计

2. 响应式设计
   - 适配移动端和桌面端布局
   - 使用Flexbox和Grid布局
   - 合理的间距和留白

3. 交互效果
   - 卡片悬停放大效果
   - 装饰元素弹跳动画
   - 平滑的过渡效果

### 设计风格

1. 配色方案
   - 主色调：粉色系
   - 渐变背景：从粉色到紫色
   - 白色卡片配以柔和阴影

2. 视觉元素
   - 圆角设计（border-radius）
   - 适当的阴影效果
   - 可爱的emoji装饰

### 性能优化

1. 图片优化
   - 使用Next.js的图片优化功能
   - 合理的图片加载策略（loading="eager"）

2. 组件优化
   - 合理的组件拆分
   - 使用React hooks管理状态
   - 避免不必要的重渲染

### 安全建议

1. 个人信息保护
   - 电话号码部分隐藏
   - 避免展示敏感信息

2. 代码安全
   - 及时更新依赖包
   - 遵循React和Next.js的最佳实践
