import "./globals.css"

export const metadata = {
  title: "StartupIQ AI - Validate Any Startup Idea in 60 Seconds",
  description: "AI-powered startup opportunity intelligence platform built for India",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}