# Modern Expense Tracker Web Application (MERN Stack)

A responsive personal finance management and expense tracking web application with a Node.js + Express REST backend, persistent MongoDB database storage, interactive Recharts analytics, and MongoDB Compass integration.

---

## 🌟 Features

- **Executive Financial Dashboard**:
  - **4 Top Summary Cards**: Total Balance (`Income - Expenses`), Total Income, Total Expenses, and Total Transactions count.
  - **Interactive Expense Overview**: Area chart showing income vs expense trends over time.
  - **Category Breakdown Chart**: Donut chart with spending distribution.
  - **Recent Transactions Feed**: Quick edit, delete, and view-all navigation.
- **Transaction Management**:
  - **Add & Edit Modal**: Accessible modal with real-time validation, category selector, payment method dropdown, date picker, and optional notes.
  - **Delete Confirmation Modal**: Safeguard preventing accidental deletion of records.
- **Dedicated Transactions Page**:
  - Full-featured data table (with responsive mobile card view).
  - Search by description, category, or notes.
  - Filter by Type (All / Income / Expense), Category, and Payment Method.
  - Filter by Date Range (Start Date & End Date).
  - Sort by Newest, Oldest, or Amount (Ascending / Descending).
  - One-click **Export to CSV**.
- **In-Depth Analytics**:
  - Monthly spending bar chart.
  - Income vs Expense monthly comparison chart.
  - Category analysis with proportional progress bars.
  - Top spending categories leaderboard.
  - Spending metrics: Average monthly spend, Highest expense, Lowest expense, and Top category.
- **Persistent MongoDB Database**:
  - Mongoose data model with schema validations, default values, timestamps, and indexes.
  - Ready for local management with **MongoDB Compass**.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** (responsive design & custom styles)
- **Recharts** (charts & data visualization)
- **Lucide React** (icons)
- **date-fns** (date formatting)

### Backend
- **Node.js** & **Express.js** (REST API)
- **Mongoose** (MongoDB object modeling)
- **dotenv** (environment variable configuration)
- **cors** & **morgan** (cross-origin access & HTTP logging)

### Database & Tools
- **MongoDB Server** (running locally on port `27017`)
- **MongoDB Compass** (graphical desktop interface to inspect and query data)

---

## 📂 Project Structure

```text
expense-tracker/
│
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Navbar, MetricCards, TransactionModal, etc.
│   │   ├── pages/               # Dashboard, Transactions, Analytics
│   │   ├── services/            # API client (fetch wrapper)
│   │   ├── utils/               # Constants, category maps, formatters
│   │   ├── App.jsx              # Main application router/state
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind directives
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                # Mongoose connection
│   ├── controllers/
│   │   └── transactionController.js # CRUD & Aggregation pipelines
│   ├── models/
│   │   └── Transaction.js       # Mongoose Schema
│   ├── routes/
│   │   └── transactionRoutes.js # REST API routes
│   ├── middleware/
│   │   └── errorHandler.js      # Centralized error handler
│   ├── scripts/
│   │   └── seed.js              # Sample data generator
│   ├── server.js                # Express app entry point
│   ├── package.json
│   ├── .env                     # Local environment variables
│   └── .env.example
│
├── package.json                 # Root orchestrator (concurrent dev runner)
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Community Server installed and running locally on port `27017`.
- **MongoDB Compass**: Installed on your system for visual database management.

### 2. Install Dependencies
Run the following from the root directory (`p4`):
```bash
npm run install:all
```
*(This installs root, backend, and frontend dependencies in one go)*

### 3. Seed Sample Data (Recommended)
To immediately populate the database with realistic sample transactions:
```bash
npm run seed
```

### 4. Start the Application
Run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/transactions](http://localhost:5000/api/transactions)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧭 MongoDB Compass Connection Guide

The application connects to MongoDB using the environment variable in `server/.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
```

### Steps to View & Manage Data in MongoDB Compass:

1. **Launch MongoDB Compass** on your computer.
2. In the **New Connection** screen, enter the local URI:
   ```text
   mongodb://127.0.0.1:27017
   ```
3. Click **Connect**.
4. In the left navigation panel, click on the database named:
   ```text
   expense_tracker
   ```
5. Click on the collection named:
   ```text
   transactions
   ```
6. You will see all documents with fields:
   - `_id`: Unique ObjectId
   - `type`: `"income"` or `"expense"`
   - `amount`: Number
   - `description`: String
   - `category`: String (e.g., "Food", "Salary")
   - `date`: ISODate
   - `paymentMethod`: String (e.g., "UPI", "Credit Card")
   - `notes`: Optional String
   - `createdAt` & `updatedAt`: Timestamps
7. Whenever you add, edit, or delete transactions in the web app, click **Refresh** in Compass to see real-time updates.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & MongoDB connection status |
| `GET` | `/api/transactions` | Retrieve transactions (supports `search`, `type`, `category`, `paymentMethod`, `startDate`, `endDate`, `sortBy`, `order`) |
| `POST` | `/api/transactions` | Create a new transaction |
| `GET` | `/api/transactions/:id` | Retrieve single transaction by ID |
| `PUT` | `/api/transactions/:id` | Update an existing transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |
| `GET` | `/api/transactions/stats` | Compute dashboard summary statistics & analytics |

### Example Create Transaction Payload
```json
{
  "type": "expense",
  "amount": 450,
  "description": "Dinner with friends",
  "category": "Food",
  "date": "2026-09-20",
  "paymentMethod": "UPI",
  "notes": "Italian restaurant dinner"
}
```

### Example Stats Response
```json
{
  "success": true,
  "data": {
    "totalIncome": 128500,
    "totalExpenses": 58349,
    "balance": 70151,
    "transactionCount": 25,
    "categoryBreakdown": [ ... ],
    "monthlyBreakdown": [ ... ],
    "highestExpense": 7500,
    "lowestExpense": 450,
    "averageExpense": 3071
  }
}
```

---

## 🛡️ License
MIT License.

