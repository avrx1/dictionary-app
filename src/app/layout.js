import "./globals.css"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className="bg-white dark:bg-black dark:text-white"

      >{children}</body>
    </html>
  )
}