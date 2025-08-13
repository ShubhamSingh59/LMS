# Mini Leave Management System

This is a **React + Node.js + MySQL** based Leave Management System.  
It allows employees to apply for leaves, track leave history, and for HR to approve/reject leave requests.

---

## 📦 Features

- **Employee Login & Dashboard**
- **Apply for Leave**
- **View My Leaves & Remaining Balance**
- **HR Dashboard to View and Approve/Reject Leaves**
- **MySQL Database (Local via MySQL Workbench)**

---

## ⚙️ Requirements

- **Node.js** installed (v18+ recommended)
- **MySQL Workbench** installed
- **MySQL server running locally**

---

## 🚀 How to Run (With Node Modules Included)

1. **Unzip the project** anywhere on your computer.

2. **Open MySQL Workbench** and create a new database:
   ```sql
   CREATE DATABASE leave_management;

3. **Update Backend .env File**
Go to the backend folder and open .env.
Set the following:

   # Server
    PORT=5000

# Database
DB_NAME=leave_management
DB_USER=lms_user           # or root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

# Auth
JWT_SECRET=super_secret_key_please_change

# HR accounts (email,password) lists (comma-separated, index-based pairing)
HR_EMAILS=hr1@company.com,hr2@company.com
HR_PASSWORDS=hr1pass,hr2pass

4. **Update your database credentials in:**
backend/config/config.js
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "leave_management",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

4. **Start Backend Server** 
cd backend
npm install
npx nodemon server.js

5. **Start Frontend**
cd ../frontend
npm install
npm start

