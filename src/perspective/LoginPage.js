import './SignUp.css';
import GoogleLogo from '../resources/images/google_logo.png';
import SignUpBackground from '../resources/images/signin-background.jpg';
import PageLogo from '../resources/images/logo.png';
import { useState, useContext } from 'react';
import { loginAPI } from '../service/api';
import { UserContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUserId } = useContext(UserContext);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const location = useLocation();
    const { state } = location;
    const redirectTo = state?.from || '/'; // Default to home page if no state is available

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginAPI({ username, password });
            const userId = response.data.user.id;
            const token = response.data.access_token;
            login(userId, token, username); // Pass username to login
            if (token) {
                navigate(redirectTo); // Navigate to the intended page
            }
        } catch (error) {
            setError(error.message || 'Login failed');
        }
    };


    const handleGoogleSignIn = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;  // Set this to your backend endpoint
        const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        const responseType = "code";
        const state = "signin";

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
                    <h2 className='signup-text'>Sign in</h2>
                    <div className="input-container">
                        <input
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="forgot-password-container">
                        <a href="/forgot-password" className="forgot-password">Forgot Password</a>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="signup-button">Sign In</button>
                    </div>
                </form>

                <div className="or">or</div>
                <button className="google-signin-button" onClick={handleGoogleSignIn}>
                    Continue with Google <img src={GoogleLogo} alt="Google logo" className="google-logo" />
                </button>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>

            <div className="image-container">
                <img src={SignUpBackground} alt="Background" />
            </div>
        </div>
    );
}

export default LoginPage;
