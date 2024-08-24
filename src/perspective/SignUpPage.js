import './SignUp.css';
import GoogleLogo from '../resources/images/google_logo.png';
import SignUpBackground from '../resources/images/signup_background.jpg';
import PageLogo from '../resources/images/logo.png';
import { useState } from 'react';
import { createUser } from '../service/api';

function SignUpPage() {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const role = 'REGULAR'; // Automatically set the role to REGULAR

        try {
            const response = await createUser({ username, email, password, role }); 
            console.log('Signup successful:', response);
            window.location.href = '/tts'; 
        } catch (error) {
            setError(error.message || 'Signup failed');
        }
    };

    const handleGoogleSignUp = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;  // Set this to your backend endpoint
        const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        const responseType = "code";
        const state = "signup";

        const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

        window.location.href = authUrl;
    };

    return (
        <div className="signup-container">
            <a href="/" className="logo-container">
                <img src={PageLogo} alt="Website Logo" className="page-logo" /> Name
            </a>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className='signup-text'>Sign up</h2>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="button-container">
                        <button type="submit" className="signup-button">Sign Up</button>
                    </div>
                </form>

                <div className="or">or</div>
                <button className="google-signin-button" onClick={handleGoogleSignUp}>
                    Sign up with Google <img src={GoogleLogo} alt="Google logo" className="google-logo" />
                </button>
                <p>Already have an account? <a href="/login">Sign In</a></p>
            </div>

            <div className="image-container">
                <img src={SignUpBackground} alt="Background" />
            </div>
        </div>
    );
}

export default SignUpPage;
