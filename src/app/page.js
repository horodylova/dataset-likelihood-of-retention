import SheetViewer from '@/components/SheetViewer';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dataset Likelihood of Retention</h1>
      <p>Connect your Google Sheets to view data</p>
      <SheetViewer />
    </div>
  )
}