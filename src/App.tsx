import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RequireAuth from './Components/RequireAuth';
import LeaderBoard from './Pages/LeaderBoard';
import Login from './Pages/Login';
import Quiz from './Pages/Quiz';
import Result from './Pages/Result';
import SignUp from './Pages/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Navbar />
      <div className='my-36'>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Quiz />} />
            <Route path='/result' element={<Result />} />
            <Route path='/leader-board' element={<LeaderBoard />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
