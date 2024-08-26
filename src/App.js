import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './perspective/HomePage';
import LoginPage from './perspective/LoginPage';
import SignUpPage from './perspective/SignUpPage';
import TextToSpeechPage from './perspective/TextToSpeechPage';
import VoiceCloningPage from './perspective/VoiceCloningPage';
import { doFetch } from "./fragment/tts/InputHistoryTabFragment";
import React, { useEffect } from 'react';



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
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/tts' element={<TextToSpeechPage />} />
        <Route path='/voiceclone' element={<VoiceCloningPage />} />
      </Routes>
    </div>
  );
}

export default App;
