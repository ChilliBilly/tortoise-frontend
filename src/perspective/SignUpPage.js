import './SignUp.css';
import GoogleLogo from '../resources/images/google_logo.png';
import SignUpBackground from '../resources/images/signup_background.jpg';
import PageLogo from '../resources/images/logo.png';
import { useState } from 'react';
import { createUser } from '../service/api'; // Import the createUser function

function SignUpPage() {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('REGULAR'); // Default role
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createUser({ username, email, password, role }); // Include role in the request
            console.log('Signup successful:', response);
            // Redirect to login or dashboard
            window.location.href = '/tts'; 
        } catch (error) {
            setError(error.message || 'Signup failed');
        }
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
                            value={username} // Updated field name
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
                    <div className="input-container">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="REGULAR">Regular</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="button-container">
                        <button type="submit" className="signup-button">Sign Up</button>
                    </div>
                </form>

                <div className="or">or</div>
                <button className="google-signin-button">
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
