import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProtectWrapper from './pages/UserProtectWrapper';
import StartPage from './pages/StartPage';
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import UserLogout from './pages/UserLogout';
import HomePage from './pages/HomePage';
import UserProfile from './components/UserProfile';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />

        {/* Protected routes */}
        <Route element={<UserProtectWrapper />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/logout" element={<UserLogout />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;