import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Message = ({ message, isCurrentUser }) => {
  const { user } = useContext(UserContext);
  
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>
        {!isCurrentUser && (
          <p className="font-semibold text-sm mb-1">
            {message.sender.username || message.sender.fullName}
          </p>
        )}
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default Message;