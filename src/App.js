import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './perspective/HomePage';
import LoginPage from './perspective/LoginPage';
import TextToSpeechPage from './perspective/TextToSpeechPage';
import VoiceCloningPage from './perspective/VoiceCloningPage';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/tts">Text To Speech</a>
          </li>
          <li>
            <a href="/voiceclone">Voice Cloning</a>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/tts' element={<TextToSpeechPage />} />
        <Route path='/voiceclone' element={<VoiceCloningPage />} />
      </Routes>
    </div>
  );
}

export default App;
