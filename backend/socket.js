const socketIo = require('socket.io');
const userModel = require('./models/user.model');

let io;
const chatRooms = {}; // Stores active chat rooms

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Join a chat room
        socket.on('join-chat', async (data) => {
            const { userId, chatRoomId } = data;

            // Validate chat room ID (1-99)
            if (chatRoomId < 1 || chatRoomId > 99) {
                return socket.emit('error', { message: 'Invalid chat room ID. Must be between 1-99' });
            }

            try {
                // Update user's socket ID
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });

                // Join the room
                socket.join(`room-${chatRoomId}`);

                // Initialize room if it doesn't exist
                if (!chatRooms[chatRoomId]) {
                    chatRooms[chatRoomId] = {
                        users: [],
                        messages: []
                    };
                }

                // Add user to room
                const user = await userModel.findById(userId).select('-password');
                if (!chatRooms[chatRoomId].users.some(u => u._id.equals(user._id))) {
                    chatRooms[chatRoomId].users.push(user);
                }

                // Notify room about new user
                io.to(`room-${chatRoomId}`).emit('user-joined', {
                    user,
                    room: chatRooms[chatRoomId]
                });

                // Send room info to the joining user
                socket.emit('room-info', chatRooms[chatRoomId]);

                console.log(`User ${userId} joined chat room ${chatRoomId}`);
            } catch (err) {
                console.error('Error joining chat:', err);
                socket.emit('error', { message: 'Error joining chat room' });
            }
        });

        // Handle new messages
        socket.on('send-message', async (data) => {
            const { userId, chatRoomId, message } = data;

            try {
                const user = await userModel.findById(userId).select('-password');
                if (!user) {
                    return socket.emit('error', { message: 'User not found' });
                }

                if (!chatRooms[chatRoomId]) {
                    return socket.emit('error', { message: 'Chat room not found' });
                }

                // Create message object
                const messageObj = {
                    user,
                    text: message,
                    timestamp: new Date()
                };

                // Add message to room history
                chatRooms[chatRoomId].messages.push(messageObj);

                // Broadcast message to room
                io.to(`room-${chatRoomId}`).emit('new-message', messageObj);
            } catch (err) {
                console.error('Error sending message:', err);
                socket.emit('error', { message: 'Error sending message' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);

            // Find and remove user from all rooms
            for (const roomId in chatRooms) {
                const room = chatRooms[roomId];
                const userIndex = room.users.findIndex(u => u.socketId === socket.id);

                if (userIndex !== -1) {
                    const userLeft = room.users[userIndex];
                    room.users.splice(userIndex, 1);
                    
                    // Notify room about user leaving
                    io.to(`room-${roomId}`).emit('user-left', {
                        user: userLeft,
                        room: chatRooms[roomId]
                    });
                }
            }

            // Update user's socket ID in DB
            await userModel.findOneAndUpdate(
                { socketId: socket.id },
                { $set: { socketId: null } }
            );
        });
    });
}

// Helper function to send messages to specific socket
const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };