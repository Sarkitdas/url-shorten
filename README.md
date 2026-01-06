# 🚀 URL Shortener - Full Stack Next.js Application

A modern, secure, and high-performance URL shortening service built with **Next.js 16 (App Router)**, **MongoDB**, and **JWT Authentication**. This project features a robust redirection engine, click tracking, and a protected user dashboard.

## Authors

[Sarkit's HUB](https://github.com/Sarkitdas)  
🌐 **Portfolio:** [URL-Shorten.com](https://url-shorten-hazel.vercel.app/)

---

## ✨ Features

* 🔐 **Secure Auth**: Signup, Login, and Logout functionality.
* 🍪 **JWT via HttpOnly Cookies**: Enhanced security against XSS attacks.
* ✂️ **Short URL Generation**: Create concise, shareable links instantly.
* 🔁 **Automatic Redirection**: High-speed redirection via dynamic short codes.
* 📊 **Analytics**: Track total clicks for every URL generated.
* 🧭 **Protected Dashboard**: Middleware-guarded routes for user management.
* ⚡ **Turbopack**: Optimized for lightning-fast development builds.
* 🗂️ **Clean Architecture**: Scalable folder structure following Next.js best practices.

---

## 🧱 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15/16+ (App Router), Tailwind CSS |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | MongoDB with Mongoose ODM |
| **Security** | JWT, bcrypt, HttpOnly Cookies |
| **Utilities** | nanoid, Middleware |

---

## 📁 Project Structure

```text
url-shorten/
├── src/
│   ├── app/                # App Router (Pages & API)
│   │   ├── api/            # Backend Endpoints
│   │   ├── shorten/        # Dynamic Redirection Logic
│   │   └── components/     # UI Components (Dashboard, Auth, etc.)
│   ├── config/             # Database Connection
│   ├── models/             # Mongoose Schemas (User, Url)
│   ├── utility/            # JWT & Cookie Helpers
│   └── middleware.js       # Route Guarding
├── public/                 # Static Assets
└── .env.local              # Environment Variables


⚙️ Environment Variables
Create a .env.local file in the root directory and add the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_ultra_secure_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000


1. Installation & Setup
Clone the repository
git clone [https://github.com/Sarkitdas/url-shorten.git](https://github.com/Sarkitdas/url-shorten.git)
cd url-shorten

2. Install dependencies
npm install

3. Run the development server
npm run dev
Open http://localhost:3000 to see the result.

🔌 API Documentation
1. Authentication
POST /api/signup – Register a new account.
POST /api/login – Authenticate and receive an HttpOnly cookie.
POST /api/logout – Clear authentication cookies.
GET /api/auth – Verify current session status.
2. URL Management
POST /api/shorten – Create a new short URL (Requires Auth).
GET /api/urls – Fetch all URLs belonging to the logged-in user.

🛡️ Security Implementation
Password Hashing: Uses bcrypt for one-way encryption of user credentials.
Secure Cookies: JWTs are stored in HttpOnly cookies, making them inaccessible to client-side scripts.
Route Protection: Next.js Middleware intercepts requests to /dashboard and /api/shorten to ensure the user is authenticated.
Atomic Updates: Click counts are incremented using MongoDB's $inc operator to prevent race conditions.

🚀 Roadmap
[ ] Custom URL Aliases (slugs)
[ ] Link Expiration (Self-destructing links)
[ ] QR Code generation for every link
[ ] Advanced Geo-analytics (Track clicks by country)
[ ] Dark Mode support



---





---

## 🤝 Contributing

Contributions are the backbone of the open-source community. To contribute:

1. **Fork** the Project
2. Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

