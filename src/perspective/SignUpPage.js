import './SignUp.css'
import GoogleLogo from '../resources/images/google_logo.png'
import SignUpBackground from '../resources/images/signup_background.jpg'

function SignUpPage() {
    return (
        <div className="signup-container">
          <div className="logo">Name</div>
          <div className="form-container">

            <form>
            <h2 className='signup-text'>Sign up</h2>
              <div className="input-container">
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="input-container">
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-container">
                <input type="password" placeholder="Password" />
              </div>
              <div className="form-button">
                <button type="submit">Sign Up</button>
              </div>
            </form>

            <div className="or">or</div>
            <button className="google-signin-button">
              Sign up with Google <img src={GoogleLogo} alt="Google logo" className="google-logo" />
            </button>
            <p>Already have an account? <a href="/login/signIn">Sign In</a></p>
          </div>

          <div className="image-container">
            <img src={SignUpBackground} alt="Background" />
          </div>
        </div>

    );
}   

export default  SignUpPage