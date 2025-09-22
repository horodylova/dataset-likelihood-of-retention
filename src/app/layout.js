import { RetentionProvider } from '@/contexts/RetentionContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RetentionProvider>
          {children}
        </RetentionProvider>
      </body>
    </html>
  )
}