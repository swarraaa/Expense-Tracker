# MERN GraphQL Expense Tracker App

This project is a comprehensive expense tracker application built using the MERN stack, Apollo GraphQL, and various other technologies. It allows users to track their expenses with advanced features like authentication and global state management.

## Features

- **Tech Stack**: MERN (MongoDB, Express.js, React.js, Node.js) with Apollo GraphQL.
- **GraphQL Mutations**: Modify data through GraphQL API with defined mutations and establish graph relationships.
- **Authentication**: Uses Passport.js for secure user authentication and MongoDB session store for session management.
- **Global State Management**: Utilizes Apollo Client for efficient state management across the application.
- **Deployment**: Deployed using Render, ensuring seamless continuous integration and delivery.
- **Automation**: Includes Cron jobs for scheduled tasks to enhance automation.

## Run locally:

### Prerequisites

- Node.js
- MongoDB
- npm/yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/mern-expense-tracker.git
   cd mern-expense-tracker
   ```

2. **Install server dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

1. **Backend `.env` Setup:**

   Create a `.env` file in the root of the backend directory with the following content:

   ```
   MONGO_URI=your_mongodb_uri
   SESSION_SECRET=mysecret123
   ```

   Replace `your_mongodb_uri` with your actual MongoDB connection URI.

2. **Frontend `.env` Setup:**

   Create a `.env` file in the `frontend` directory with the following content:

   ```
   VITE_NODE_ENV=development
   ```

   This configuration sets the environment for Vite, the development server for the React app.

### Running the Application

1. **Start the server:**

   ```bash
   cd backend
   npm run dev
   ```

3. **Start the client:**

   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the app:**

   - Server running at: `http://localhost:4000/graphql`
   - Client running at: `http://localhost:3000`

## Deployment

- **Render**: Both frontend and backend deployed on render.
- A cron job is set up using the `cron` package to send periodic requests, ensuring the server remains active.

### Authentication Flow

- **Serialization**: Passport.js saves user IDs to sessions upon login.
- **Deserialization**: Passport.js fetches user details using the stored ID on subsequent requests.
