const socketIo = require('socket.io');
const userModel = require('./models/user.model');

let io;
const onlineUsers = {}; // Stores online users: { socketId: userId }

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // User authentication and online status
        socket.on('authenticate', async (userId) => {
            try {
                const user = await userModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id, status: 'online' },
                    { new: true }
                ).select('-password');

                if (!user) {
                    return socket.emit('error', { message: 'User not found' });
                }

                onlineUsers[socket.id] = userId;

                socket.emit('authenticated', user);
                console.log(`User authenticated: ${user.username}`);
            } catch (err) {
                console.error('Authentication error:', err);
                socket.emit('error', { message: 'Authentication failed' });
            }
        });

        // Search user by username
        socket.on('search-user', async (username) => {
            try {
                const user = await userModel.findOne({ username })
                    .select('-password -socketId');

                if (!user) {
                    return socket.emit('user-not-found', { username });
                }

                socket.emit('user-found', user);
            } catch (err) {
                console.error('Search error:', err);
                socket.emit('error', { message: 'Search failed' });
            }
        });

        // Start private chat
        socket.on('start-chat', async ({ senderId, receiverUsername }) => {
            try {
                const [sender, receiver] = await Promise.all([
                    userModel.findById(senderId).select('-password'),
                    userModel.findOne({ username: receiverUsername }).select('-password')
                ]);

                if (!receiver) {
                    return socket.emit('error', { message: 'User not found' });
                }

                const roomId = [sender._id, receiver._id].sort().join('_');
                
                // Join both users to the same room
                socket.join(roomId);
                
                // If receiver is online, notify them
                const receiverSocketId = Object.keys(onlineUsers).find(
                    key => onlineUsers[key] === receiver._id.toString()
                );
                
                if (receiverSocketId) {
                    io.to(receiverSocketId).join(roomId);
                    io.to(receiverSocketId).emit('chat-request', {
                        from: sender,
                        roomId
                    });
                }

                socket.emit('chat-started', {
                    roomId,
                    receiver,
                    isOnline: !!receiverSocketId
                });
            } catch (err) {
                console.error('Chat start error:', err);
                socket.emit('error', { message: 'Failed to start chat' });
            }
        });

        // Send private message
        socket.on('private-message', async ({ roomId, senderId, message }) => {
            try {
                const sender = await userModel.findById(senderId).select('-password');
                if (!sender) {
                    return socket.emit('error', { message: 'Sender not found' });
                }

                const messageObj = {
                    sender,
                    message,
                    timestamp: new Date()
                };

                // Save message to database here if needed
                // await saveMessageToDatabase(roomId, senderId, message);

                io.to(roomId).emit('new-private-message', messageObj);
            } catch (err) {
                console.error('Message send error:', err);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            
            const userId = onlineUsers[socket.id];
            if (userId) {
                await userModel.findByIdAndUpdate(userId, {
                    status: 'offline',
                    lastSeen: new Date()
                });
                delete onlineUsers[socket.id];
            }
        });
    });
}

// Helper function to send notification to user
const sendNotificationToUser = async (userId, notification) => {
    if (!io) return false;

    try {
        const user = await userModel.findById(userId);
        if (!user || !user.socketId) return false;

        io.to(user.socketId).emit('notification', notification);
        return true;
    } catch (err) {
        console.error('Notification error:', err);
        return false;
    }
}

module.exports = { initializeSocket, sendNotificationToUser };