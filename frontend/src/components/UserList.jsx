import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserList = () => {
  const { user, setCurrentChat } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
      if (response.status === 200) {
        setUsers(response.data.filter(u => u._id !== user._id));
      }
      setLoading(false);
    };
    fetchUsers();
  }, [user]);

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="overflow-y-auto h-full">
      {users.map(user => (
        <div 
          key={user._id} 
          className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
          onClick={() => setCurrentChat(user)}
        >
          <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 mr-3">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;