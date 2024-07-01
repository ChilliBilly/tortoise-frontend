import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './perspective/HomePage';
import LoginPage from './perspective/LoginPage';
import SignUpPage from './perspective/SignUpPage';
import TextToSpeechPage from './perspective/TextToSpeechPage';
import VoiceCloningPage from './perspective/VoiceCloningPage';

function App() {
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
