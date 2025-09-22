const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function getGoogleAuth() {
  let credentials;
  
  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    try {
      const credentialsJson = Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf8');
      credentials = JSON.parse(credentialsJson);
    } catch (error) {
      throw new Error('Failed to parse GOOGLE_CREDENTIALS_BASE64');
    }
  } else {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    if (!privateKey) {
      throw new Error('GOOGLE_PRIVATE_KEY or GOOGLE_CREDENTIALS_BASE64 environment variable is missing');
    }
    
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Invalid private key format - missing BEGIN marker');
    }
    
    credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: 'googleapis.com'
    };
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth;
}

async function getSheetData(sheetId, range) {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });
    
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error.message);
    throw error;
  }
}

async function getSheetInfo(sheetId) {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching sheet info:', error);
    throw error;
  }
}

module.exports = {
  getSheetData,
  getSheetInfo
};