import { RetentionProvider } from '@/contexts/RetentionContext';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import './globals.css';

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