import express from 'express';
import dotenv from 'dotenv';
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

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDB();
});
