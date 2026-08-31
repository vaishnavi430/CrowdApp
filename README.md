
# CrowdApp

A full-stack crowdfunding platform that connects creators with supporters and allows users to create, discover, and support crowdfunding campaigns.

## 🚀 Overview

CrowdApp is a full-stack web application developed as an internship project.

The platform provides a simple and modern crowdfunding experience where:

- Creators can create and manage campaigns
- Users can browse available campaigns
- Supporters can contribute to campaigns
- Users can track their donations
- Creators can monitor campaign performance
- Users can manage their profile and account settings
- The application supports Light, Dark, and System themes
- Users can customize the application accent color and dashboard density

## ✨ Features

### 👤 Authentication

- User registration
- User login
- JWT-based authentication
- Protected dashboard routes
- Change password
- Logout functionality

### 📢 Campaign Management

- Browse campaigns
- Search campaigns
- Filter campaigns
- View campaign details
- Create campaigns
- Edit campaigns
- Manage personal campaigns
- Campaign status management
- Campaign progress tracking

### 💰 Donations

- Donation interface
- Donation amount validation
- Donation history
- Donation statistics
- Recent supporters
- Campaign funding updates

> Note: The current donation system is a simulated payment flow for demonstration purposes. A production version can integrate a real payment gateway such as Razorpay or Stripe.

### 📊 Dashboard

- Dashboard overview
- Campaign statistics
- Donation statistics
- Recent activity
- Recent campaigns
- Revenue analytics
- Profile management
- Account settings
- Security settings
- Notification settings
- Appearance settings

### 🎨 Theme & Customization

- Light theme
- Dark theme
- System theme
- Indigo accent
- Emerald accent
- Rose accent
- Amber accent
- Sky accent
- Comfortable density
- Compact density

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Express Validator

## 📁 Project Structure

```text
CrowdApp/
│
├── .gitignore
├── README.md
│
├── Crowdfunding_backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
└── Crowdfunding_frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── features/
    │   ├── layouts/
    │   ├── pages/
    │   └── services/
    ├── package.json
    └── vite.config.js
````

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/vaishnavi430/CrowdApp.git
```

Move into the project:

```bash
cd CrowdApp
```

## 🔧 Backend Setup

Open a terminal and navigate to the backend:

```bash
cd Crowdfunding_backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```text
Crowdfunding_backend/.env
```

Add your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
npm run dev
```

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Crowdfunding_frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend folder if required by the application configuration.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 🔐 Environment Variables

Environment files are excluded from Git using `.gitignore`.

The following information should never be committed to GitHub:

* MongoDB credentials
* JWT secrets
* Cloudinary API keys
* Other private API keys
* Passwords
* Production credentials

Each developer should create their own `.env` files locally.

## 🌐 Application Routes

### Public Routes

```text
/
 /about
 /contact
 /campaigns
 /campaigns/:id
 /login
 /signup
```

### Protected Routes

```text
/dashboard
/dashboard/campaigns
/dashboard/create-campaign
/dashboard/edit-campaign/:id
/dashboard/donations
/dashboard/profile
/dashboard/edit-profile
/dashboard/change-password
/dashboard/settings
```

## 📌 Main Application Flow

```text
User
 │
 ├── Register / Login
 │
 ├── Browse Campaigns
 │
 ├── View Campaign Details
 │
 ├── Donate to Campaign
 │
 └── Dashboard
       │
       ├── Campaign Management
       ├── Donations
       ├── Profile
       ├── Settings
       └── Analytics
```

## 🎯 Project Purpose

CrowdApp was developed as a full-stack internship project to demonstrate practical experience with:

* Frontend development
* Backend API development
* REST APIs
* MongoDB database integration
* JWT authentication
* CRUD operations
* Campaign management
* Donation management
* Responsive UI development
* Theme customization
* Git and GitHub
* Full-stack application architecture

## 🚧 Future Improvements

Possible future improvements include:

* Real payment gateway integration
* Email notifications
* Campaign verification
* Admin dashboard
* Advanced analytics
* Automated donation receipts
* Campaign moderation
* Payment transaction tracking

## 👨‍💻 Developer

**Vaishnavi**

Full-Stack Internship Project

## 📄 License

This project was created for educational and internship purposes.

