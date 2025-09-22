import { getSheetData } from '../../../lib/googleSheets';

export async function GET() {
  try {
    const sheetId = process.env.SHEET_ID;
    const sheetName = process.env.SHEET_NAME;
    const range = `${sheetName}!A:Z`;

    if (!sheetId || !sheetName) {
      return Response.json({ error: 'Missing SHEET_ID or SHEET_NAME environment variables' }, { status: 500 });
    }

    const data = await getSheetData(sheetId, range);
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return Response.json({ error: 'Failed to fetch sheet data' }, { status: 500 });
  }
}