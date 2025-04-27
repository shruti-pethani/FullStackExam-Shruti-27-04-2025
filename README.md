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
DB_PORT=3306
MONGO_URI=mongodb://localhost:27017/ecommerce
```

### 4. Run Sequelize Migrations

```bash
npx sequelize-cli db:migrate
```
### 5. Import MongoDB Collection (IMPORTANT)

- A `products` collection file is provided in this repository.
- Import it into your local MongoDB Compass before starting the application.

### 6. Start Server (Development Mode)

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

# 🛍️ E-Commerce Frontend (Next.js + Tailwind CSS)

This is the **frontend** for the E-Commerce application, built using **Next.js App Router**, **TailwindCSS**, and **Axios**.

---

## 🚀 Tech Stack

- Next.js 14 (App Directory)
- TypeScript
- TailwindCSS
- Axios (API calls)
- Lucide React Icons
- Context API (for Cart Count management)
- date-fns (Date formatting)

---

## 📦 Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── auth/          (Login, Signup)
│   │   ├── products/      (Product List)
│   │   ├── cart/          (Cart Page)
│   │   ├── orders/        (Orders Page)
│   │   └── checkout/      (Checkout Page)
│   ├── components/        (Navbar, LayoutProvider)
│   ├── context/           (CartContext.tsx)
│   ├── services/          (api.ts)
│   └── styles/            (globals.css)
├── public/
│   └── placeholder.png
├── package.json
└── tsconfig.json
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

✅ Make sure your **backend** server is running before starting the frontend!

### 3. Run Development Server

```bash
npm run dev
```

Frontend app will start at:

```
http://localhost:3000/
```

---

## Available Pages

| Page    | Path            | Description                |
|:-------:|:---------------:|:---------------------------:|
| Home    | `/`              | Redirects to /products      |
| Signup  | `/auth/signup`   | New user signup             |
| Login   | `/auth/login`    | Existing user login         |
| Products| `/products`      | All products listing        |
| Cart    | `/cart`          | Cart page (protected)       |
| Checkout| `/checkout`      | Place an order              |
| Orders  | `/orders`        | View past orders            |

---


