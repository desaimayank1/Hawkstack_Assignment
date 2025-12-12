# 📚 Course Learning Platform (MERN + Zustand)

A modern course learning dashboard built using *Node.js, **Express, **Prisma, **SQLite/MySQL, **React, **Tailwind CSS, and **Zustand* for global state management.  
Users can browse courses, enroll, and view their enrolled status — all synced with the backend.

---

## 🚀 Features

### 🔹 Frontend
- Clean and responsive UI (React + Tailwind)
- Zustand-based global state management
- Smooth loaders & skeletons while fetching data
- Real-time status update on course enrollment
- Protected routing for dashboard

### 🔹 Backend
- REST API using Node.js + Express
- Prisma ORM for database operations
- Endpoint for course enrollment and user lookup

---
```bash
## 🏗️ Project Structure
bash
Hawkstack_Assignment/
├── backend/
│ ├── src/
│ │ ├── index.ts
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── prisma.ts
│ │ └── middleware/
│ ├── prisma/
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ ├── store/
│ ├── pages/
│ └── App.tsx
└── package.json

```
```bash
## ⚙️ Setup Instructions

# 1️⃣ Clone the repository
git clone https://github.com/desaimayank1/Hawkstack_Assignment.git .
cd Hawkstack_Assignment

# 2️⃣ Install dependencies
cd backend
npm install

cd ../frontend
npm install

# 3️⃣ Setup Prisma (in backend folder)
cd ../backend
npx prisma generate
npx prisma migrate dev --name new

# 4️⃣ Run the application
# Open two terminals: one for backend, one for frontend

# Terminal 1: Start backend
cd backend
npm run dev
# Backend server runs on http://localhost:3000

# Terminal 2: Start frontend
cd frontend
npm run dev
# Frontend server runs on http://localhost:5173
```

<br><br>

## 🔌 API Endpoints

### 📌 1. Get User Details
*GET* /user/:username  
Returns the user information along with their enrolled courses.

Example:
GET http://localhost:3000/user/mayank

### 📌 2. Create a New User
*POST* /user/:username  
Creates a new user if they don't already exist.

Example:
POST http://localhost:3000/user/mayank

### 📌 3. Get All Courses
*GET* /courses  
Returns the full list of available courses.

Example:
GET http://localhost:3000/courses

### 📌 4. Enroll a User to a Course
*POST* /courses/:id/enroll  
Enrolls a user into the specified course.

Example:
POST http://localhost:3000/courses/3/enroll
Body: { "username": "mayank" }


<br><br>

##  Project Approach / Architecture

### 1. State Management (Zustand)
- Stores user info (username, isLoggedIn)
- Maintains the full list of courses
- Provides global actions:
  - login()
  - updateCourseStatus()
- Ensures the frontend stays in sync with the backend immediately after enrollment.

---

### 2. Backend Design
- Built using a *layered architecture*:
  - *Routes* → Define API endpoints  
  - *Controllers* → Handle incoming requests  
  - *Service / DB Layer (Prisma)* → Execute database operations  
- Prisma ensures:
  - Clean schema management
  - Reliable migrations
  - Strong typing and validation
- Data Model includes foreign key relations:
  - *Course*
  - *User*
  - *Enrollment*

---

### 3. Enrollment Workflow
1. User clicks *Enroll*
2. Frontend triggers:
   ```http
   POST /courses/:id/enroll
3. Backend:
  - Creates an Enrollment record  
  - Returns *201 Created*
4. Zustand updates the course status to "enrolled"
5. The UI button changes instantly to *“Enrolled”*
