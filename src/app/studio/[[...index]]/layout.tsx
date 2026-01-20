export const metadata = {
  title: 'Sanity Studio',
  description: 'Backend content management for the blog',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0, height: '100vh', width: '100vw'}}>
        {children}
      </body>
    </html>
  )
}
