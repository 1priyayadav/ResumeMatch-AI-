# JobFit Analyzer

JobFit Analyzer is a modern web application designed to help job seekers optimize their resumes for specific job descriptions. By comparing a user's resume against a target job description, the application calculates an ATS (Applicant Tracking System) match rate and provides actionable, personalized suggestions for improvement.

The platform also includes user authentication and a history log, allowing job seekers to save and review their past resume analyses.

![JobFit Analyzer](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

# Deployed Link :- [https://resume-match-ai-murex.vercel.app/]

## ✨ Features

- **Resume Matching**: Upload a PDF/DOCX resume and paste a job description to instantly calculate a compatibility match rate.
- **AI-Powered Suggestions**: Receive personalized, bullet-point suggestions on missing keywords and formatting improvements to bypass ATS filters.
- **User Authentication**: Secure user registration and login system with JWT authentication.
- **Analysis History**: Logged-in users can view and manage their past resume analyses.
- **Modern Premium UI**: A sleek, responsive, glassmorphism-inspired user interface built with React and Bootstrap.

## 🛠️ Technology Stack

This project is built using the **MERN** stack:

*   **Frontend**: React.js, React Bootstrap, CSS (Glassmorphism UI), Axios
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose ORM)
*   **Authentication**: JSON Web Tokens (JWT), bcryptjs
*   **File Processing**: `express-fileupload`, `pdf-parse`, `mammoth` (for DOCX), `natural` (NLP keyword extraction)

---

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Prerequisites
- Node.js installed on your machine.
- A MongoDB cluster (e.g., MongoDB Atlas) with your connection URI.

### 2. Clone the Repository
Download the code from GitHub to your local machine:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 3. Backend Setup
Navigate to the server directory, install dependencies, and configure the environment:
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 4. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install --legacy-peer-deps
```

Start the React development server:
```bash
npm start
# The app will open in your browser at http://localhost:3000
```

---

## 🚀 Deployment Guide

This project can be easily deployed to modern cloud hosting platforms. **Vercel** (for the frontend) and **Render** (for the backend) are excellent, highly recommended choices that offer free tiers.

### Files to Push to GitHub
Before deploying, make sure you push the following to your GitHub repository:
- The entire `client` directory (excluding `node_modules` and purely local build files).
- The entire `server` directory (excluding `node_modules` and your local `.env` file).
- This `README.md` and standard ignored files (`.gitignore`).

### Step 1: Deploy the Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow network access (IP whitelist: `0.0.0.0/0` to allow all connections).
3. Copy your MongoDB Connection String URI.

### Step 2: Deploy the Backend (Render)
1. Create an account on [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following build configurations:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In the **Environment Variables** section, add your variables:
   - `MONGODB_URI`: Your copied MongoDB connection string.
   - `JWT_SECRET_KEY`: A secure random string.
   - `CLIENT_URL`: Add your Vercel frontend URL here *after* you deploy the frontend.
6. Click **Deploy**. Note the assigned Render URL (e.g., `https://jobfit-api.onrender.com`).

### Step 3: Deploy the Frontend (Vercel)
1. Create an account on [Vercel](https://vercel.com/).
2. Click **Add New Project** and import your GitHub repository.
3. Set the **Framework Preset** to **Create React App**.
4. Set the **Root Directory** to `client`.
5. In the **Environment Variables** section, add your backend URL:
   - `REACT_APP_API_URL`: Your new Render backend URL (e.g., `https://jobfit-api.onrender.com/api/v1/`).
6. Click **Deploy**.

### Step 4: Finalize Configuration
Once Vercel gives you your live frontend URL (e.g., `https://jobfit-analyzer.vercel.app`):
1. Go back to your Render backend dashboard.
2. Update the `CLIENT_URL` environment variable to match your new Vercel URL.
3. Restart the Render server to apply the changes to the CORS configuration.

---

*Developed by Priya Yadav (Software Developer) - 2025*
