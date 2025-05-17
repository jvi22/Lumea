import React from 'react';
import UserProtectWrapper from './pages/UserProtectWrapper';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignUp';
import UserLogout from './pages/UserLogout';
import HomePage from './pages/HomePage';

const App = () => {

  return (
    <div>

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />

        <Route path="/home"
         element={
          <UserProtectWrapper>
            <HomePage />
          </UserProtectWrapper>
        } />
        <Route path="/user/logout" element={<UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
        } />

         </Routes>
    </div>
  )
}

export default App;