import express from 'express';
import dotenv from 'dotenv';
import {initializeServer} from './lib/socket.js'
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import songRoutes from './routes/song.routes.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.routes.js';
import { connectDB } from './lib/db.js';
import fileupload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

const httpServer = createServer()
initializeServer(httpServer)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal service error'
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDB();
});


