import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './perspective/HomePage';
import LoginPage from './perspective/LoginPage';
import SignUpPage from './perspective/SignUpPage';
import TextToSpeechPage from './perspective/TextToSpeechPage';
import VoiceCloningPage from './perspective/VoiceCloningPage';
import { doFetch } from "./fragment/tts/InputHistoryTabFragment";
import React, { useEffect, useContext, useState } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import { verifyTokenAPI } from "./service/DataService"
import TabViewCard from './component/home/TabViewCard';


function App() {
  useEffect(() => {
    // Set up the interval to call doFetch every 5 seconds
    const intervalId = setInterval(() => {
      doFetch(); // Trigger the doFetch function
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure this runs only once after the component mounts


  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/tabview' element={<ProtectedRoute><TabViewCard /></ProtectedRoute>} />
          <Route path='/tts' element={<ProtectedRoute><TextToSpeechPage /></ProtectedRoute>} />
          <Route path='/voiceclone' element={<ProtectedRoute><VoiceCloningPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </UserProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token, loading } = useContext(UserContext);
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    if (loading) return;

    const verifyToken = async () => {
      try {
        const response = await verifyTokenAPI(token);
        if (response.data.message === 'Token is valid') {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          navigate('/login', { state: { from: window.location.pathname } });
        }
      } catch (error) {
        console.error("Token verification failed", error);
        setIsValidToken(false);
        navigate('/login', { state: { from: window.location.pathname } });
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate('/login', { state: { from: window.location.pathname } });
    }
  }, [token, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return isValidToken ? children : null;
};

export default App;
