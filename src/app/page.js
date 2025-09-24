'use client'

import { Splitter, SplitterPane } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import DisabilitiesSection from '../components/DisabilitiesSection';
import VariablesSection from '../components/VariablesSection';
import OutputsSection from '../components/OutputsSection';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 20px 0',
        flexShrink: 0
      }}>
        <h1 style={{ margin: 0 }}>
          Tenant Retention Analysis
        </h1>
        <Link 
          href="/analytics" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          View Analytics
        </Link>
      </div>
      
      <Splitter 
        style={{
          flex: '1',
          minHeight: '0'
        }}
        panes={[
          {
            size: '320px',
            min: '0px',
            max: '500px',
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
          <OutputsSection />
        </SplitterPane>
      </Splitter>
    </div>
  );
}
