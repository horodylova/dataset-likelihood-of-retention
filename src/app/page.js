'use client'

import { Splitter, SplitterPane } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { useState, useEffect } from 'react';
import DisabilitiesSection from '../components/DisabilitiesSection';
import VariablesSection from '../components/VariablesSection';
import OutputsSection from '../components/OutputsSection';

export default function Home() {
  const [filters, setFilters] = useState({
    disabilities: {
      visual: false,
      hearing: false,
      alzheimer: false,
      hiv: false,
      physical: false,
      mental: false,
      mobility: false,
      alcohol: false,
      substance: false
    },
    variables: {
      incomeSource: [],
      sex: '',
      veteran: false,
      fosterCare: false,
      disabilityCount: ''
    }
  });

  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetData();
  }, []);

  const fetchSheetData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sheets');
      const data = await response.json();
      
      if (data.values && data.values.length > 0) {
        const headers = data.values[0];
        const rows = data.values.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
        setSheetData(rows);
      }
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const retentionData = [];
  const chartData = [];

  return (
    <div style={{
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        margin: '0 0 20px 0',
        flexShrink: 0
      }}>
        Tenant Retention Analysis
      </h1>
      
      <Splitter 
        style={{
          flex: '1',
          minHeight: '0'
        }}
        panes={[
          {
            size: '320px',      // фиксированный размер в пикселях вместо процентов
            min: '0px',         // можно свернуть до 0
            max: '500px',       // максимальный размер
            collapsible: true,
            resizable: true
          }
        ]}
      >
        <SplitterPane>
          <div style={{
            padding: '20px',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
          }}>
            <PanelBar style={{
              height: '100%',
              overflow: 'hidden'
            }}>
              <PanelBarItem title="Disabilities" expanded={true}>
                <DisabilitiesSection />
              </PanelBarItem>
              
              <PanelBarItem title="Variables" expanded={true}>
                <VariablesSection />
              </PanelBarItem>
            </PanelBar>
          </div>
        </SplitterPane>
        
        <SplitterPane>
          <OutputsSection
            loading={loading}
            retentionData={retentionData}
            chartData={chartData}
          />
        </SplitterPane>
      </Splitter>
    </div>
  );
}
