import './globals.css'

export const metadata = {
  title: 'Resume.AI - 简历解析',
  description: '智能识别 PDF 与 DOCX 文档',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

