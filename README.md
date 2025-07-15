# 🇰🇪 Kenya Money Market Funds Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

---

## 📖 Project Overview

**Kenya Money Market Funds Tracker** is a full-stack web platform for real-time tracking, analysis, and comparison of Kenyan Money Market Funds (MMFs). It provides investors, analysts, and the public with up-to-date NAV/yield data, historical performance, regulatory resources, and fund manager information—all in one place.

---

## 🌟 What the Website Does
- **Aggregates and displays** real-time and historical MMF performance data from official and fund manager sources.
- **Provides analytics**: performance trends, best/worst performers, volatility, and more.
- **Offers a directory** of all licensed fund managers with links and profiles.
- **Integrates regulatory resources** from the Central Bank of Kenya and CMA.
- **Educational content**: blog, FAQs, and resources for investors.
- **Responsive dashboard** for easy comparison and visualization.

---

## 🚀 Rolling 5-Year Data & Auto-Update

- **All dashboards and analytics** now display data for the last 5 years (rolling window), automatically updating as time progresses.
- **Backend API** endpoints return only the last 5 years of fund performance and analytics data by default.
- **Automated daily updates**: The backend runs a scheduled job every day to ingest and update the latest fund data, ensuring the dashboard is always current.
- **Frontend auto-refresh**: Dashboard and fund details pages automatically refresh their data every 24 hours to reflect the latest updates.

---

## 🛠️ How It Works
1. **Automated Data Ingestion**: Python scripts scrape, process, and store MMF data from fund manager sites, CBK, and CMA. **A daily cron job ensures the database is always up-to-date.**
2. **Backend API**: Node.js/Express with TypeORM exposes REST endpoints for funds, performance, analytics, and more. **All endpoints now serve a rolling 5-year window of data.**
3. **Frontend**: React + Tailwind CSS dashboard fetches and visualizes data, with interactive charts and tables. **All dashboards and analytics auto-refresh every 24 hours and show only the last 5 years of data.**
4. **Database**: PostgreSQL stores all fund, performance, and user data. Redis is used for caching.
5. **Deployment**: Docker Compose and AWS templates for production.

---

## 🏗️ Project Structure
```
PLP Final Project/
├── backend/           # Node.js/Express API, TypeORM, models, routes
├── frontend/          # React app, pages, components, Tailwind CSS
├── data_ingestion/    # Python scripts for scraping and ETL
├── deployment/        # Docker, deployment templates
├── Fund Manager List.xlsx
├── README.md
└── Project.md
```

---

## 🧩 Full Stack Tools & Dependencies

### Frontend
- **React 18** (SPA, hooks, context)
- **Vite** (fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **React Router** (routing)
- **Recharts, Chart.js** (data visualization)
- **Axios** (API requests)
- **React Query** (data fetching/caching)
- **Framer Motion** (animations)
- **React Hook Form, React Hot Toast, React Icons**

### Backend
- **Node.js 18**
- **Express.js** (REST API)
- **TypeORM** (ORM, migrations)
- **PostgreSQL 14+** (database)
- **Redis** (caching)
- **JWT** (authentication)

### Data Ingestion
- **Python 3.9+**
- **BeautifulSoup4** (web scraping)
- **Pandas** (data manipulation)
- **psycopg2** (PostgreSQL client)
- **Selenium** (for sites blocking bots)

### DevOps/Deployment
- **Docker Compose**
- **AWS CloudFormation** (optional)

---

## 📦 Installed Dependencies (Key Examples)

### Frontend
- react, react-dom, react-router-dom, recharts, chart.js, tailwindcss, axios, react-query, framer-motion, react-hook-form, react-hot-toast, react-icons, date-fns, socket.io-client, vite, @vitejs/plugin-react, typescript

### Backend
- express, typeorm, pg, redis, jsonwebtoken, dotenv, cors, body-parser, nodemon

### Data Ingestion
- requests, beautifulsoup4, pandas, psycopg2, selenium

---

## 🚦 How to Run the Project

### 1. Clone the Repository
```bash
git clone <repo-url>
cd PLP\ Final\ Project
```

### 2. Install Dependencies
- **Backend**: `cd backend && npm install`
- **Frontend**: `cd ../frontend && npm install`
- **Data Ingestion**: `cd ../data_ingestion && pip install -r requirements.txt`

### 3. Configure Environment Variables
- Backend: create `.env` in `backend/` with DB and API settings
- Frontend: create `.env` in `frontend/` with API URL

### 4. Database Setup
- Create PostgreSQL DB: `createdb kenya_mmf`
- Run migrations: `cd backend && npx typeorm migration:run`

### 5. Start Services
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`
- **Data Ingestion**: `cd data_ingestion && python cma_cbk_ingest.py`

### 6. Access the App
- Frontend: [http://localhost:5173](http://localhost:5173) (or next available port)
- Backend API: [http://localhost:4000/api](http://localhost:4000/api)

---

## 🗂️ Key Features
- Real-time MMF data and analytics
- **Rolling 5-year window for all analytics and dashboards**
- **Daily auto-update of fund data**
- Fund manager directory with links
- Regulatory resources (CBK, CMA)
- Blog, FAQ, and educational content
- Responsive, mobile-friendly UI
- Secure authentication and API
- Automated data ingestion and error handling

---

## 📚 API Endpoints (Examples)
- `GET /api/funds` — List all funds
- `GET /api/fund-performances` — All performance data (last 5 years by default)
- `GET /api/analytics/best-performing` — Top funds (last 5 years)
- `GET /api/analytics/trends` — Performance trends (last 5 years)

---

## 🧪 Testing & Quality
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`
- Integration: `npm run test:integration`

---

## 🔒 Security & Best Practices
- JWT authentication, rate limiting, SQL injection protection
- CORS, environment variable encryption, HTTPS (prod)
- Code splitting, lazy loading, caching, accessibility

---

## 🤝 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. PRs, issues, and suggestions are welcome!

---

## 📄 License
MIT License. See [LICENSE](LICENSE).

---

## 🙏 Acknowledgments
- Central Bank of Kenya, Capital Markets Authority, open source community

---

**Disclaimer:** Past performance does not guarantee future results. This application is for informational purposes only and not financial advice.
