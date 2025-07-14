# 🇰🇪 Kenya Money Market Funds Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

A comprehensive real-time tracking platform for Kenyan Money Market Funds (MMFs) with historical performance analysis, comparison tools, and automated data ingestion.

## 🚀 Features

### 📊 Data & Analytics
- **Real-time NAV and yield data** for all registered Kenyan MMFs
- **Historical performance charts** with customizable timeframes (1M, 3M, 6M, 1Y)
- **Fund comparison tools** for side-by-side analysis
- **Performance rankings** and trend analysis
- **Export functionality** for reports and data

### 🔔 Notifications & Alerts
- **Custom price alerts** with email/SMS notifications
- **Daily performance digests** delivered to your inbox
- **Threshold-based notifications** for yield changes
- **Market movement alerts** for significant changes

### 📱 User Experience
- **Mobile-responsive design** for all devices
- **Dark/Light theme** support
- **Interactive charts** with zoom and pan capabilities
- **Fast search and filtering** across all funds
- **Bookmark favorite funds** for quick access

## 🌐 Website Structure & Pages

### 🏠 Home Page
- **Hero section** with key market insights and trending funds
- **Quick fund search** with autocomplete functionality
- **Market overview** with top-performing funds
- **Latest news and updates** from financial markets
- **Call-to-action** sections for registration and alerts

### 📈 **Fund Performance Hub** - "Market Intelligence Center"
- **Interactive dashboard** with real-time fund tracking
- **Advanced comparison tools** with side-by-side analysis
- **Pie charts** showing fund distribution and market share
- **Performance graphs** with multiple timeframes (1M, 3M, 6M, 1Y)
- **Comparison reports** with detailed analytics
- **AI-powered insights** and investment advice
- **Risk assessment** and portfolio suggestions
- **Export functionality** for reports and data

### 🏦 **Fund Manager Directory** - "Investment Partners Portal"
- **Comprehensive list** of all Kenyan fund managers
- **Tabbed interface** organizing managers by category:
  - Commercial Banks
  - Investment Banks
  - Asset Management Companies
  - Insurance Companies
- **Active links** to official websites and platforms
- **Manager profiles** with contact information
- **Performance history** for each manager's funds
- **Direct investment links** where available

### 🏛️ **Central Bank of Kenya Integration** - "Regulatory Insights"
- **Real-time data** integration from CBK APIs
- **Monetary policy updates** and announcements
- **Interest rate information** and trends
- **Economic indicators** and statistics
- **Regulatory guidelines** and compliance information
- **Market surveillance** data and reports

### 📋 **CMA Regulatory Hub** - "Compliance & Standards"
- **Capital Markets Authority** official information
- **Regulatory filings** and disclosures
- **Market rules** and guidelines
- **Investor protection** information
- **Licensing information** for fund managers
- **Market conduct** and enforcement updates

### 📝 **Financial Blog** - "Market Insights & Analysis"
- **Expert analysis** on money market trends
- **Investment strategies** and tips
- **Market commentary** from financial experts
- **Educational content** for investors
- **Weekly market reviews** and outlook
- **Guest contributions** from industry professionals

### 📞 **Contact & Support** - "Get in Touch"
- **Contact forms** for general inquiries
- **Technical support** channels
- **Feedback submission** system
- **Partnership inquiries** for fund managers
- **Media contact** information
- **Office locations** and business hours

## 🎨 Design & User Experience

### Color Scheme (Financial-Friendly)
- **Primary**: Deep Navy Blue (#1a365d) - Trust and stability
- **Secondary**: Forest Green (#2d5016) - Growth and prosperity
- **Accent**: Gold (#d69e2e) - Wealth and success
- **Neutral**: Charcoal Gray (#2d3748) - Professionalism
- **Success**: Emerald Green (#059669) - Positive performance
- **Warning**: Amber (#d97706) - Caution indicators
- **Error**: Crimson Red (#dc2626) - Risk alerts

### Interactive Features
- **Hover effects** on all clickable elements
- **Smooth transitions** and animations
- **Loading states** with skeleton screens
- **Toast notifications** for user feedback
- **Modal dialogs** for detailed information
- **Tooltips** for enhanced user guidance
- **Drag-and-drop** functionality for fund comparisons
- **Real-time updates** with WebSocket connections

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **React Router** for multi-page navigation
- **Recharts** for interactive data visualization
- **Chart.js** for additional chart types (pie charts, radar charts)
- **Tailwind CSS** for modern, responsive styling
- **React Query** for efficient data fetching and caching
- **Axios** for HTTP client management
- **Framer Motion** for smooth animations and transitions
- **React Hook Form** for form management
- **React Hot Toast** for notifications
- **React Icons** for consistent iconography

### Backend
- **Node.js 18** with Express.js framework
- **TypeORM** for database management and migrations
- **PostgreSQL 14** as primary database
- **Redis** for caching and session management
- **JWT** for secure authentication

### Data Pipeline
- **Python 3.9+** for data scraping and processing
- **BeautifulSoup4** for web scraping
- **Pandas** for data manipulation
- **AWS Lambda** for scheduled data ingestion
- **PDF parsing** for regulatory document processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher
- **PostgreSQL** 14.0 or higher
- **Python** 3.9 or higher
- **Redis** 6.0 or higher
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/kenya-mmf-tracker.git
cd kenya-mmf-tracker
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

#### Data Pipeline Setup
```bash
cd ../data_ingestion
pip install -r requirements.txt
```

### 3. Environment Configuration

Create environment files for each component:

#### Backend (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=mmf_user
DB_PASSWORD=your_secure_password
DB_NAME=kenya_mmf

# API Configuration
API_KEY=your_cbk_api_key
JWT_SECRET=your_jwt_secret_key
PORT=5000

# Redis Configuration
REDIS_URL=redis://localhost:6379

# External APIs
CBK_API_URL=https://api.centralbank.go.ke
CMA_API_URL=https://www.cma.or.ke
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### 4. Database Setup

```bash
# Create database
createdb kenya_mmf

# Run migrations
cd backend
npx typeorm migration:run
```

### 5. Start Services

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
cd frontend
npm start
```

#### Start Data Ingestion (Optional)
```bash
cd data_ingestion
python main.py
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📁 Project Structure

```
kenya-mmf-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── MarketOverview.tsx
│   │   │   │   └── NewsSection.tsx
│   │   │   ├── performance/
│   │   │   │   ├── FundTable.tsx
│   │   │   │   ├── PerformanceChart.tsx
│   │   │   │   ├── ComparisonTool.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   └── InsightsPanel.tsx
│   │   │   ├── fund-managers/
│   │   │   │   ├── ManagerDirectory.tsx
│   │   │   │   ├── ManagerCard.tsx
│   │   │   │   └── ManagerTabs.tsx
│   │   │   ├── regulatory/
│   │   │   │   ├── CBKIntegration.tsx
│   │   │   │   └── CMARegulatory.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogList.tsx
│   │   │   │   ├── BlogPost.tsx
│   │   │   │   └── BlogSidebar.tsx
│   │   │   └── contact/
│   │   │       ├── ContactForm.tsx
│   │   │       └── SupportChannels.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── PerformanceHub.tsx
│   │   │   ├── FundManagers.tsx
│   │   │   ├── CBKPage.tsx
│   │   │   ├── CMAPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── services/
│   │   │   ├── apiClient.ts
│   │   │   ├── authService.ts
│   │   │   └── websocketService.ts
│   │   ├── hooks/
│   │   │   ├── useFunds.ts
│   │   │   ├── usePerformance.ts
│   │   │   └── useWebSocket.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   └── styles/
│   │       ├── globals.css
│   │       └── components.css
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
├── data_ingestion/
│   ├── scrapers/
│   ├── processors/
│   └── requirements.txt
└── deployment/
    ├── docker-compose.yml
    └── aws_template.yml
```

## 📚 API Documentation

### Core Endpoints

#### Get All Funds
```http
GET /api/funds
```

#### Get Fund Performance
```http
GET /api/funds/:id/performance?duration=1y
```

#### Create Price Alert
```http
POST /api/alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "fund_id": 101,
  "threshold": 10.25,
  "notification_type": "email"
}
```

For complete API documentation, visit `/api-docs` when the backend is running.

## 🧪 Testing

### Run All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Integration tests
npm run test:integration
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Production Deployment

#### Using Docker (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

#### Manual AWS Deployment
```bash
# Deploy using CloudFormation
aws cloudformation create-stack \
  --stack-name mmf-tracker \
  --template-body file://deployment/aws_template.yml \
  --capabilities CAPABILITY_IAM
```

### Environment Variables for Production
```env
NODE_ENV=production
DB_HOST=your-rds-endpoint
DB_PASSWORD=your-production-password
JWT_SECRET=your-production-secret
REDIS_URL=your-elasticache-endpoint
CBK_API_KEY=your-cbk-api-key
CMA_API_KEY=your-cma-api-key
WEBSOCKET_URL=your-websocket-endpoint
```

## 📦 Enhanced Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "recharts": "^2.8.0",
    "chart.js": "^4.3.0",
    "react-chartjs-2": "^5.2.0",
    "tailwindcss": "^3.3.0",
    "react-query": "^3.39.3",
    "axios": "^1.4.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.45.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.10.0",
    "date-fns": "^2.30.0",
    "react-markdown": "^8.0.7",
    "socket.io-client": "^4.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^18.16.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

## 📊 Data Sources

- **Central Bank of Kenya API** - Primary real-time data source
- **CMA Regulatory Filings** - Daily performance reports
- **Fund Manager Websites** - Fallback data collection
- **Manual Data Entry** - For historical data gaps

## 🔒 Security

- **JWT Authentication** for user sessions
- **Rate Limiting** (100 requests/minute per IP)
- **SQL Injection Protection** via parameterized queries
- **CORS Configuration** for cross-origin requests
- **Environment Variable Encryption** using AWS KMS

## 📈 Performance Optimization

- **Redis Caching** for frequently accessed data
- **Database Indexing** on performance-critical columns
- **CDN Integration** for static assets
- **Lazy Loading** for chart components
- **Database Connection Pooling**

## 🚀 Development Workflow

### Key Features Implementation

#### 1. Multi-Page Navigation
- **React Router** for seamless page transitions
- **Breadcrumb navigation** for better UX
- **Active link highlighting** in navigation menu
- **Page transitions** with Framer Motion animations

#### 2. Real-Time Data Integration
- **WebSocket connections** for live fund updates
- **CBK API integration** for regulatory data
- **CMA data scraping** for compliance information
- **Automatic data refresh** every 5 minutes

#### 3. Interactive Charts & Analytics
- **Recharts** for line and bar charts
- **Chart.js** for pie charts and radar charts
- **Custom chart components** for fund comparisons
- **Export functionality** (PDF, CSV, Excel)

#### 4. Fund Manager Directory
- **Tabbed interface** for different manager categories
- **Search and filter** functionality
- **Direct links** to official websites
- **Performance history** for each manager

#### 5. Blog System
- **Markdown support** for rich content
- **Category filtering** and tags
- **Search functionality** across all posts
- **Comment system** (optional)

#### 6. Contact & Support
- **Multi-channel contact forms**
- **Live chat integration** (optional)
- **Ticket system** for technical support
- **FAQ section** with searchable content

### Development Guidelines

#### Code Organization
- **Component-based architecture** with clear separation of concerns
- **Custom hooks** for reusable logic
- **TypeScript** for type safety
- **Consistent naming conventions**

#### Styling Standards
- **Tailwind CSS** utility classes
- **Custom CSS** for complex animations
- **Responsive design** for all screen sizes
- **Accessibility compliance** (WCAG 2.1)

#### Performance Optimization
- **Code splitting** for better load times
- **Lazy loading** for images and components
- **Memoization** for expensive calculations
- **Caching strategies** for API responses

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Process
- **Automated testing** must pass
- **TypeScript compilation** without errors
- **Linting** standards compliance
- **Accessibility** review for UI changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/your-username/kenya-mmf-tracker/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/kenya-mmf-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/kenya-mmf-tracker/discussions)

## 🙏 Acknowledgments

- **Central Bank of Kenya** for providing regulatory data
- **Capital Markets Authority** for regulatory framework
- **Open Source Community** for the amazing tools and libraries

---

**Disclaimer**: Past performance does not guarantee future results. This application is for informational purposes only and should not be considered as financial advice.
