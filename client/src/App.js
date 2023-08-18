import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Home from './pages/home';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './pages/protected';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Transaction from './pages/transaction';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home />
              </Protected>
            }
          />
          <Route
            path='/transactions'
            element={
              <Protected isSignedIn={isSignedIn}>
                <Transaction />
              </Protected>
            }
          />
          <Route path='/login' element={<Login onSignin={signin} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
