# Tenant Retention Analysis Dashboard

A Next.js application for analyzing tenant retention patterns and trends using interactive data visualization.

## Features

- **Interactive Filtering**: Filter data by date range, property type, location, rent amount, and tenant demographics
- **Data Visualization**: Kendo React charts showing retention trends over time
- **Data Grid**: Sortable and filterable table with tenant information and retention status
- **Export Functionality**: Export filtered data to Excel format
- **Filter Presets**: Save and load commonly used filter combinations

## Tech Stack

- Next.js 14
- React Context API for state management
- Kendo React UI components (Grid, Charts, Inputs)
- Google Sheets API integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:

GOOGLE_SERVICE_ACCOUNT_EMAIL= your-service-account@project.iam.gserviceaccount.com GOOGLE_PRIVATE_KEY=your-private-key
GOOGLE_SHEET_ID=your-sheet-id


3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Structure

The application expects tenant data with the following fields:
- Tenant ID
- Property Type
- Location
- Rent Amount
- Lease Start/End Dates
- Tenant Demographics
- Retention Status