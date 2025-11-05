import './globals.css'

export const metadata = {
  title: 'Fashion Store - Premium Clothing',
  description: 'Shop the latest trends in fashion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
