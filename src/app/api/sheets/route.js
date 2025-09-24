import { getSheetData } from '../../../lib/googleSheets';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheetId = searchParams.get('id') || process.env.SHEET_ID;
    const range = searchParams.get('range') || process.env.SHEET_NAME || 'EXPORT API';

    if (!sheetId) {
      return Response.json({ error: 'Missing sheet ID parameter or SHEET_ID environment variable' }, { status: 400 });
    }

    console.log('Fetching data from sheet:', sheetId, 'range:', range);
    const data = await getSheetData(sheetId, range);
    console.log('Data received:', data ? data.length : 0, 'rows');
    
    return Response.json({ data: { values: data } });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return Response.json({ error: 'Failed to fetch sheet data: ' + error.message }, { status: 500 });
  }
}