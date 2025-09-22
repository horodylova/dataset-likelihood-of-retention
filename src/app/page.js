import SheetViewer from '@/components/SheetViewer';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Tenant Retention Analysis</h1>
      <p>Connect Google Sheets to analyze tenant retention data</p>
      <SheetViewer />
    </div>
  )
}