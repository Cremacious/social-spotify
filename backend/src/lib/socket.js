import { Server } from 'socket.io';
import { Message } from '../models/message.model.js';

export const initializeServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  const userSockets = new Map();
  const userActivities = new Map();

  io.on('connection', (socket) => {
    socket.on('user_connected', (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, 'Idle');
      io.emit('user_connected', userId); // Broadcast user is connected
      socket.emit('users_online', Array.from(userSockets.keys()));
    });
    socket.on('update_activity', ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit('activity_update', { userId, activity });
    });

    socket.on('send_message', async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        const message = await Message.create({ senderId, receiverId, content });
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', message);
        }
        socket.emit('message_sent', message);
      } catch (error) {
        console.log('Message error', error);
        socket.emit('message_error', error.message);
      }
    });

    socket.on('disconnect', (userId) => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) io.emit('user_disconnected', disconnectedUserId);
    });
  });
};
