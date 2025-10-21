# Tenant Retention Analysis Dashboard

A Next.js application for analyzing tenant retention patterns and trends using interactive data visualization.

## Overview

This application provides comprehensive analysis tools for understanding tenant retention patterns across different demographics, disabilities, income sources, and other key factors. The dashboard offers both single-filter and multi-filter analysis capabilities with interactive charts and data export functionality.

## Features

- **Multi-Filter Analysis**: Apply multiple filters simultaneously to analyze specific tenant populations
- **Interactive Data Visualization**: Dynamic charts showing retention rates over 10-year periods
- **Comprehensive Filtering Options**:
  - Demographics (Age, Gender, Veteran Status)
  - Disabilities (Visual, Hearing, Physical/Medical, Mental Health, etc.)
  - Income Sources
  - Program Screening criteria
  - Neighborhood and Agency filters
- **Data Export**: Export filtered results and charts to PDF format
- **Real-time Results**: Instant updates as filters are applied
- **Raw Data Access**: View and analyze underlying dataset

## Technology Stack

- **Frontend**: Next.js 14, React 18
- **UI Components**: Kendo React UI components
- **Charts**: Kendo React Charts
- **Data Source**: Google Sheets API integration
- **Styling**: CSS-in-JS with responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Google Sheets API access (for data source)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dataset-likelihood-of-retention
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Google Sheets API credentials.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Single Filter Analysis
1. Navigate to individual filter sections (Demographics, Disabilities, etc.)
2. Select filter criteria
3. View retention analysis results and charts

### Multi-Filter Analysis
1. Use the Multi-Filter Table to combine multiple criteria
2. Select values for each filter category
3. Submit to see combined analysis results
4. Export results to PDF if needed

### Data Export
- Use the PDF export functionality to save charts and data tables
- Export includes both tabular data and visualization charts

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── FilterCard.js      # Individual filter components
│   ├── MultiFilterTable.js # Multi-filter interface
│   ├── OutputsSection.js  # Results display
│   └── ...
├── contexts/              # React contexts
├── lib/                   # Utility functions
│   ├── retention/         # Retention calculation logic
│   ├── filterUtils.js     # Filter processing
│   └── googleSheets.js    # API integration
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

