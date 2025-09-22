import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: 'nextjssheetsapi',
      private_key_id: '34de283aa3f6795da021f4b01baa236d0c5ce6a3',
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: 'sheets-reader-service@nextjssheetsapi.iam.gserviceaccount.com',
      client_id: '101974614370902507348',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/sheets-reader-service%40nextjssheetsapi.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com'
    },
    scopes: SCOPES,
  });
  
  return auth;
}

export async function getSheetData(spreadsheetId, range = 'Sheet1') {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

export async function getSheetInfo(spreadsheetId) {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching sheet info:', error);
    throw error;
  }
}