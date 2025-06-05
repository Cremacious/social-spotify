import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import songsRoutes from './routes/songs.routes.js';
import albumRoutes from './routes/albums.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
