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
