import { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!currentChat) return;
    
    // Fetch message history from API
    const fetchMessages = async () => {
      const response = await fetch(`/api/chat/history/${currentUser._id}/${currentChat._id}`);
      const data = await response.json();
      setMessages(data);
    };
    
    fetchMessages();
    
    // Socket listeners
    socket.on('new-private-message', (message) => {
      if (message.sender._id === currentChat._id) {
        setMessages(prev => [...prev, message]);
      }
    });
    
    return () => {
      socket.off('new-private-message');
    };
  }, [currentChat]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('private-message', {
        roomId: [currentUser._id, currentChat._id].sort().join('_'),
        senderId: currentUser._id,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">
      {/* Message display area */}
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} message={msg} isCurrentUser={msg.sender._id === currentUser._id} />
        ))}
      </div>
      
      {/* Message input */}
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};