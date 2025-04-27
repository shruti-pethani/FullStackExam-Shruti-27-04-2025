# 🛍️ E-Commerce Backend (Node.js + Express + MySQL + MongoDB)

This is the backend API for the E-Commerce application, built with **Node.js**, **Express.js**, **MySQL** (for Orders and Users), and **MongoDB** (for Products and Cart).

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- Sequelize ORM (MySQL)
- Mongoose (MongoDB)
- JWT Authentication
- MySQL & MongoDB database
- bcrypt for password hashing

---
## 📦 Project Structure

```
Backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── utils/
├── migrations/
├── index.ts
├── .env
├── package.json
└── README.md
```

---
## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shruti-pethani/FullStackExam-Shruti-27-04-2025.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DB_NAME=your_mysql_database
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT+3306
MONGO_URI=mongodb://localhost:27017/ecommerce
```

### 4. Run Sequelize Migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Start Server (Development Mode)

```bash
npm start
```

Server will start at:

```
http://localhost:5000/
```

## Authentication

- JWT-based authentication for user login/signup
- Middleware to protect private routes

## Database

- **MySQL** for structured data (Users, Orders)
- **MongoDB** for flexible modules (Products, Cart )

