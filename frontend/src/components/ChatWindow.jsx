import { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import Message from './Message';

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (!currentChat || !user || !user._id) return;

    const fetchMessages = async () => {
      const response = await fetch(`/api/chat/history/${user._id}/${currentChat._id}`);
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    const handleNewMessage = (message) => {
      // Show message if it's for this chat
      if (
        (message.sender._id === currentChat._id && message.receiver._id === user._id) ||
        (message.sender._id === user._id && message.receiver._id === currentChat._id)
      ) {
        setMessages(prev => [...prev, message]);
      }
    };

    socket.on('new-private-message', handleNewMessage);

    return () => {
      socket.off('new-private-message', handleNewMessage);
    };
  }, [currentChat, user, socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() && user && user._id && currentChat && currentChat._id) {
      socket.emit('private-message', {
        roomId: [user._id, currentChat._id].sort().join('_'),
        senderId: user._id,
        receiverId: currentChat._id,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} message={msg} isCurrentUser={msg.sender._id === user._id} />
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;