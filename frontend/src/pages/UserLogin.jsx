import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ userData, setUserData ] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };
    
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      
    if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
     setEmail('')
    setPassword('')
      
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-4xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Pink left section */}
          <div className="w-full md:w-2/5 bg-gradient-to-b from-indigo-200 to-indigo-400 p-8 md:p-12 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
                <p className="text-lg mb-2">Continue your journey with</p>
                <p className="text-lg">meaningful connections</p>
              </div>
              
              <div className="mt-8">
                <p className="text-lg">New to Lumea?</p>
                <Link 
                  to="/signup" 
                  className="inline-block mt-3 px-6 py-2 bg-white text-indigo-400 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* White right section */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Login to your account</h2>
            </div>


            <form onSubmit={(e) => {
              submitHandler(e);
            }} className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-2">What's your email</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-400 focus:ring-indigo-300 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-600">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-5">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;