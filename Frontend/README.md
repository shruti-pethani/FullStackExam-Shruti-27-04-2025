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


