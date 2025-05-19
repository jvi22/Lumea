import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [fade, setFade] = useState(true);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const steps = [
    "Your name is ____________",
    "and you would like to sign up with your email address ______________",
    "Create a strong password with min 6 characters _______________",
    "Great, you are all set."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      fullname: fullName,
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    setUsername('');
    setEmail('');
    setFullName('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-4xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Pink left section */}
          <div className="w-full md:w-2/5 bg-gradient-to-b from-indigo-200 to-indigo-400 p-8 md:p-12 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-6">Sign up</h1>
                <p className="text-lg mb-2">Get started in a few clicks,</p>
                <p className="text-lg mb-2">build meaningful connections</p>
                <p className="text-lg">right away.</p>
              </div>
              
              <div className="mt-8">
                <p className="text-lg">Have an account?</p>
                <Link 
                  to="/login" 
                  className="inline-block mt-3 px-6 py-2 bg-white text-indigo-400 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* White right section */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            <div className="h-20 mb-8 flex items-center">
              <p className={`text-lg text-indigo-300 ${fade ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                {steps[currentStep]}
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 transition-all"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                  minLength={6}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-500 transition-colors flex items-center justify-center"
              >
                Create account
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;