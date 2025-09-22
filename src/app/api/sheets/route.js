import { getSheetData } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const spreadsheetId = searchParams.get('id');
    const range = searchParams.get('range') || 'Sheet1';
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID is required' },
        { status: 400 }
      );
    }
    
    const data = await getSheetData(spreadsheetId, range);
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheet data' },
      { status: 500 }
    );
  }
}