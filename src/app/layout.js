import './globals.css'

export const metadata = {
  title: 'MOOD IT',
  description: '记录想法，创造音乐',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}1