# 🚀 Template Coding Test - Frontend (Next.js)

## 🌐 Live Demo
👉 https://template-coding-test-fe.vercel.app/

---

## 📌 Overview
This project is a frontend application built with **Next.js** for the coding test submission.  
It provides a responsive chat interface that connects to the backend API, supports session-based conversations, and displays chat history.

---

## ⚙️ Tech Stack
- Next.js
- React
- TypeScript
- TailwindCss
- REST API integration, Stream API

---

## ✨ Features
- Responsive UI for desktop and mobile
- Chat interface connected to backend API
- Session-based conversation handling
- Load and display chat history
- API integration with backend service

---

## 🛠️ Setup & Run

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create environment file

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

If `.env.example` does not exist, create `.env.local` manually and add the following variable:

```env
NEXT_PUBLIC_BASE_API_URL=http://localhost:3001/api/v1
```

### Environment variable explanation

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_API_URL` | Backend API base URL used by the frontend |

---

### 3. Run the development server

```bash
npm run dev
```

Then open:

👉 http://localhost:3000

---

## 🔗 Backend Connection

Make sure the backend server is running before starting the frontend.

Example backend local URL:

```env
http://localhost:3001/api/v1
```

If you want to connect to a deployed backend, update `.env.local` like this:

```env
NEXT_PUBLIC_BASE_API_URL=https://your-backend-domain.com/api/v1
```

---

## 📂 Project Structure

```bash
app/
components/
views/
services/
types/
utils/
styles/
constants/
config/
hooks/
```

---

## 🔐 Notes

- Use `.env.local` for local development
- Restart the Next.js server after changing environment variables
- The `NEXT_PUBLIC_` prefix is required so the variable can be used on the client side

---

## 🚀 Production Build

```bash
npm run build
npm run start
```
