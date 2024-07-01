import './SignUp.css'
import GoogleLogo from '../resources/images/google_logo.png'
import SignUpBackground from '../resources/images/signin-background.jpg'
import PageLogo from '../resources/images/logo.png'

function LoginPage() {
    return (
        <div className="signup-container">
          <a href="/" className="logo-container">
            <img src={PageLogo} alt="Website Logo" className="page-logo" /> Name
          </a>
          <div className="form-container">

            <form>
            <h2 className='signup-text'>Sign in</h2>
              <div className="input-container">
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-container">
                <input type="password" placeholder="Password" />
              </div>
              <div className="forgot-password-container">
                 <a href="/forgot-password" className="forgot-password">Forgot Password</a>
              </div>
              <div className="button-container">
                <button type="submit" className="signup-button">Sign In</button>
              </div>
            </form>

            <div className="or">or</div>
            <button className="google-signin-button">
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

export default  LoginPage