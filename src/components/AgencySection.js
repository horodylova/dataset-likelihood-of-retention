'use client'

export default function AgencySection({ onMultiSelectionChange, resetSignal }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      {/* Здесь будут фильтры по агентствам; логика добавится позже */}
    </div>
  );
}