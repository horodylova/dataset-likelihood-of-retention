'use client'

import '@progress/kendo-theme-bootstrap/dist/all.css';
import './globals.css';
import { RetentionProvider } from '../contexts/RetentionContext';

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