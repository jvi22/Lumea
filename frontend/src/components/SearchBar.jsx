import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { setCurrentChat } = useContext(UserContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/search?q=${searchTerm}`);
    if (response.status === 200) {
      setResults(response.data);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      
      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto">
          {results.map(user => (
            <div
              key={user._id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                setCurrentChat(user);
                setResults([]);
                setSearchTerm('');
              }}
            >
              <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 mr-2">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;