<div align="center">

<h1>🏫 Smart Complaint Management System</h1>
<p><strong>SCMS</strong> — A modern, full-stack platform for hostel & campus complaint handling</p>

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<p>
  Developed by <strong>Vanshika Salekar</strong> · Navrachana University, Vadodara<br/>
  Internship Duration: <em>2 Feb 2026 – 2 Jun 2026</em>
</p>

</div>

---

## 📌 Overview

The **Smart Complaint Management System (SCMS)** is a MERN Stack web application designed to digitize and streamline hostel and campus complaint management. Students can register complaints related to water, electricity, internet, cleanliness, or maintenance — and track them in real time. Admins get a structured workflow enriched with smart automation to reduce manual effort.

> Developed as part of an internship and academic final-year project under **Navrachana University, Vadodara**.

---

## 🌍 Live Deployment Links

| Service | URL |
|---|---|
| 🖥️ **Frontend (React)** | [smartcomplaintsystem-1-lv5q.onrender.com](https://smartcomplaintsystem-1-lv5q.onrender.com) |
| ⚙️ **Backend (Node API)** | [smartcomplaintsystem-h2u5.onrender.com](https://smartcomplaintsystem-h2u5.onrender.com) |

> **Note:** Hosted on Render's free tier — the server may take **30–60 seconds to wake up** on the first request after a period of inactivity.

---

## 🎯 Objectives

- ⚡ Faster, structured complaint registration
- 🔍 Transparent status tracking for students
- 🗂️ Organized complaint workflow for administrators
- 🤖 Smart automation to minimize manual intervention
- 📊 Analytics and reporting for informed decision-making

---

## 👥 User Roles

### 🎓 Student
| Capability | Description |
|---|---|
| Register & Login | Secure account creation and authentication |
| Submit Complaints | Add category, description, location, and optional image |
| Track Status | View real-time complaint lifecycle updates |
| View History | Access all past complaints and their details |

### 🛡️ Admin
| Capability | Description |
|---|---|
| Dashboard | View and manage all complaints at a glance |
| Filter & Search | Filter by status, category, and date |
| Update Status | Move complaints through the lifecycle |
| Add Remarks | Maintain transparent resolution history |
| Analytics | Access reports and performance data |

---

## ⭐ Key Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Student / Admin)
- Protected routes for dashboards

### 📝 Complaint Management
- Complaint creation with category, description & location
- Optional proof image upload (via Multer)
- Unique Complaint ID generation
- Status lifecycle: `Pending → In Progress → Resolved / Rejected`

### 🤖 Smart Automation
| Feature | Description |
|---|---|
| 🏢 Auto Department Assignment | Routes complaints to the right department automatically |
| 🔑 Keyword-Based Priority Prediction | Assigns priority based on complaint content |
| 🔁 Duplicate Complaint Detection | Flags similar complaints to avoid redundancy |
| ⏱️ SLA Deadline Monitoring | Tracks resolution deadlines for each complaint |
| 🚨 Overdue Complaint Highlighting | Visually flags complaints past their SLA |
| 📋 Complaint History Tracking | Full audit trail for every status change |
| 🗃️ Reports Stored in Database | Persistent analytics reports for decision-making |

### 📊 Reports & Analytics
- Category-wise complaint statistics
- Status-wise complaint summary
- Most problematic category/location detection
- Department performance tracking

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS, React Router DOM, Axios, lucide-react |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT, bcrypt.js |
| **File Upload** | Multer |
| **Dev Tools** | VS Code, GitHub, Postman |

---

## 📂 Project Structure

```
Smart-Complaint-System/
│
├── backend/
│   ├── config/               # DB and environment config
│   ├── controllers/          # Route logic and business rules
│   ├── middleware/           # Auth and error middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── uploads/              # Uploaded complaint images
│   ├── utils/                # Helper functions
│   ├── seed.js               # Sample data seeder
│   ├── server.js             # App entry point
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page-level views
│       ├── services/         # API calls (Axios)
│       ├── context/          # Global state (AuthContext etc.)
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## 🗄️ Database Collections

SCMS uses **12 MongoDB collections** for structured, scalable complaint handling:

| Collection | Purpose |
|---|---|
| `users` | Student and admin accounts |
| `complaints` | Core complaint records |
| `categories` | Complaint categories |
| `departments` | Department master data |
| `statuses` | Status definitions |
| `priorities` | Priority levels |
| `locations` | Campus location data |
| `complaintHistory` | Status change audit log |
| `complaintAttachments` | Uploaded proof images |
| `complaintRemarks` | Admin remarks per complaint |
| `notifications` | User alerts |
| `reports` | Stored analytics reports |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd Smart-Complaint-System
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

> Backend runs at: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs at: `http://localhost:5173`

---

## 🌱 Database Seeding (Optional)

To populate the database with sample data (admin + students + complaints + reports):

```bash
cd backend
node seed.js
```

**Demo Credentials after seeding:**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@gmail.com` | `admin123` |
| Student | `student1@gmail.com` | `student123` |

---

## 📋 Complaint Status Flow

```
[Submitted]
     ↓
  Pending
     ↓
 In Progress
     ↓
Resolved  ──or──  Rejected
```

> Every status transition is recorded in **Complaint History** for full transparency.

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Login Page | Secure login for students and admins |
| Register Page | New student registration |
| Student Dashboard | Complaint overview and submission |
| Complaint Submission | Form with category, location & image upload |
| Complaint Details | Full complaint info and status history |
| Admin Dashboard | All complaints with filters and controls |
| Reports Page | Analytics and statistics view |
| Admin Complaint Details | Status update and remarks panel |

---

## ☁️ Deployment Details

SCMS is deployed using **Render (Free Tier)** for both frontend and backend services.

### Architecture

| Layer | Service |
|---|---|
| 🖥️ **Frontend** | Render Static Site — React Vite production build |
| ⚙️ **Backend** | Render Web Service — Node.js + Express.js |
| 🗄️ **Database** | MongoDB Atlas — Free M0 Cluster |

### ⚠️ Important Note on File Storage

Render's free tier **does not provide persistent local file storage**. Complaint images uploaded via Multer may be lost after a server redeployment or restart.

For a production-grade setup, integrate a cloud storage provider:

| Provider | Use Case |
|---|---|
| **Cloudinary** | Easy image hosting with transformations |
| **AWS S3** | Scalable object storage for any file type |

---

## 🚀 Future Enhancements

- [ ] Department-level login system
- [ ] SMS / Email notification integration
- [ ] Complaint escalation mechanism
- [ ] Student feedback and rating system
- [ ] Mobile application (React Native)
- [ ] AI-based complaint classification
- [ ] Real-time dashboard with WebSockets

---

## 👩‍🎓 Project & Academic Details

| Field | Details |
|---|---|
| **Project Name** | Smart Complaint Management System (SCMS) |
| **Developer** | Vanshika Salekar |
| **University** | Navrachana University, Vadodara |
| **Internship Duration** | 2 Feb 2026 – 2 Jun 2026 |
| **Technology** | MERN Stack |

---

## ✅ Conclusion

SCMS provides an efficient, transparent digital platform for hostel and campus complaint resolution. It reduces manual workload for administration, improves accountability through audit trails, and supports data-driven decisions via analytics — making campus life smoother for everyone.

---

## 📜 License

This project was developed for **academic and internship purposes**.<br/>
All rights reserved to **Vanshika Salekar** and **Navrachana University, Vadodara**.