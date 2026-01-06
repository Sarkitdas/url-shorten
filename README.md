🚀 Features

🔐 Signup / Login / Logout
🍪 JWT auth with HttpOnly cookies
✂️ Short URL generation
🔁 Automatic redirection via short codes
📊 Click tracking
🧭 Protected dashboard (middleware)
🗂️ Clean, scalable structure
⚡ Fast builds (Turbopack)
🧱 Tech Stack

Frontend: Next.js 16+ (App Router)
Backend: Next.js API Routes
Database: MongoDB + Mongoose
Auth: JWT, Cookies
Utilities: bcrypt, nanoid
Styling: CSS / Tailwind-ready

📁 Project Structure
url-shorten/
│
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── shorten/
│   │   │   ├── signup/
│   │   │   └── urls/
│   │   │
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Headers/
│   │   │   ├── Homepage/
│   │   │   ├── Login/
│   │   │   ├── Notification/
│   │   │   ├── Signup/
│   │   │   └── Subscription/
│   │   │
│   │   ├── shorten/
│   │   │   └── [shortCode]/page.jsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── config/
│   │   └── dbclient.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Url.js
│   │
│   ├── utility/
│   │   ├── JWT_helper.js
│   │   ├── Middleware_utility.js
│   │   └── Token_cookies.js
│   │
│   └── middleware.js
│
├── .env.local
├── package.json
├── next.config.mjs
└── README.md

⚙️ Environment Variables

Create .env.local in the root:

MONGODB_URI=**************
JWT_SECRET=*****************
NEXT_PUBLIC_BASE_URL=***********

📦 Installation
git clone https://github.com/Sarkitdas/url-shorten.git
cd url-shorten
npm install
npm run dev


Open: http://localhost:3000

🔌 API Endpoints

🔐 Auth >>>>>>>>>>
POST /api/signup – Register
POST /api/login – Login (sets JWT cookie)
POST /api/logout – Logout
GET /api/auth – Verify auth

✂️ URLs>>>>>>>>>>
POST /api/shorten – Create short URL
GET /api/urls – Get user URLs

🔁 Short URL Redirect >>>>>>>>>>
File: src/app/shorten/[shortCode]/page.jsx
Flow:
Read shortCode
Find URL
Increment clicks
Redirect to original URL
Handle invalid codes

🧩 Components >>>>>>>>>>
Dashboard: User URLs & analytics (protected)
Headers: Navigation & auth-aware UI
Homepage: Landing page
Login / Signup: Auth forms
Notification: Toasts/alerts
Subscription: Pricing UI (future-ready)

🧰 Utilities >>>>>>>>>>
JWT_helper.js: Sign & verify JWT
Token_cookies.js: Set/read/clear HttpOnly cookies
Middleware_utility.js: Route protection helpers

🗄️ URL Model >>>>>>>>>>
File: src/models/Url.js
Fields:
longUrl – Original URL
shortCode – Unique ID
userId – Owner
clicks – Counter
createdAt – Timestamp

🛡️ Security >>>>>>>>>>
HttpOnly cookies
bcrypt hashing
JWT verification
Protected routes
Atomic click updates

🧪 Scripts >>>>>>>>>>
npm run dev
npm run build
npm run start
npm run lint

🚀 Roadmap >>>>>>>>>>
Custom aliases
Expiring links
QR codes
Advanced analytics
Rate limiting
Admin panel

🤝 Contributing >>>>>>>>>>
Fork
Create branch
Commit
Open PR

📄 License
|
MIT License

👨‍💻 Author
|
Saikat Das
GitHub: https://github.com/Sarkitdas
