import { getSheetInfo } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const spreadsheetId = searchParams.get('id');
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID is required' },
        { status: 400 }
      );
    }
    
    const info = await getSheetInfo(spreadsheetId);
    
    return NextResponse.json({ 
      title: info.properties?.title || 'Untitled Sheet',
      sheets: info.sheets?.map(sheet => sheet.properties?.title) || []
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheet info' },
      { status: 500 }
    );
  }
}