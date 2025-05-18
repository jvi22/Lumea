import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [username]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-4xl mb-4">
            {user.fullName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-gray-500">@{user.username}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700">{user.bio || 'No bio yet'}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Posts</p>
            <p className="font-bold">24</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Connections</p>
            <p className="font-bold">156</p>
          </div>
        </div>
        
        <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          Message
        </button>
      </div>
    </div>
  );
};

export default UserProfile;