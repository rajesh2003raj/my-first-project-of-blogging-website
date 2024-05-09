import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Define __dirname for resolving paths
const __dirname = path.resolve();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// MongoDB connection
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
import UserRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import Postrouter from './routes/CreatePost.router.js';
import commentRouter from './routes/Comment.route.js';

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', Postrouter);
app.use('/api/v1/comments', commentRouter);

// Serve index.html for any other routes (SPA support)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal server error';
  res.status(statuscode).json({
    success: false,
    statuscode,
    message
  });
});

export default app;
