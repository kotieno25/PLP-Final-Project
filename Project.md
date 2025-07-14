Kenya MMF Tracker - Project Documentation

## Project Structure
kenya-mmf-tracker/
 backend/ # Node.js + Express + TypeORM
 frontend/ # React + Tailwind + Recharts
 data_ingestion/ # Python scripts + Redis + Scrapers
 deployment/ # AWS CloudFormation templates
 
Installation & Setup
1. Install Dependencies
- Backend: cd backend && npm install
- Frontend: cd ../frontend && npm install

2. Set Environment Variables
Create backend/.env with:
DB_HOST=localhost
DB_PORT=5432
DB_USER=mmf_user
DB_PASSWORD=secure_password
DB_NAME=kenya_mmf
API_KEY=your_cbk_api_key
REDIS_URL=redis://localhost:6379

3. Initialize the Database:
npx typeorm migration:run
4. Start Services:
- Backend: npm run dev
- Frontend: npm start
- Ingestion: python data_ingestion/main.py
 System Architecture
Frontend <--> Backend <--> PostgreSQL
 |
 --> Redis <--> Python Ingestion

## Database Schema
Tables: funds, fund_performances
Includes indexes, foreign keys, and basic constraints.
 API Endpoints
GET /api/funds
GET /api/funds/:id/performance?duration=1y
POST /api/alerts (Authenticated)
 Data Ingestion Workflow
Sources: CBK API, CMA PDFs, Web scraping
Cron: 0 20 * * * python3 data_ingestion/main.py

## Frontend Components
components/: FundTable, Chart, ComparisonTool, AlertManager
services/: apiClient, authService

## Critical Dependencies
Backend: express, typeorm, redis
Frontend: react, recharts, tailwindcss
Ingestion: pandas, beautifulsoup4, pdfplumber

## Configuration Files
frontend/tailwind.config.js
backend/ormconfig.js

## Deployment Guide
AWS: RDS, EC2, S3, Lambda, CloudFront
Deploy: aws cloudformation create-stack ...

## esting Strategy
Unit tests: Jest, React Testing Library
Integration: DB container, contract tests
Validation: Python custom validators

## Implementation Highlights
Redis caching, chart pre-aggregation, JWT + rate limits, CMA compliance
 License
MIT License See LICENSE for details.
 Quick Start Recap
1. Setup DB + .env
2. Run migrations
3. Start ingestion
4. Run backend & frontend
5. Deploy to AWS if needed