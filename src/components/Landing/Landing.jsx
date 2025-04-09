import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <main className="landing">
      <div className="card">
        <h1>Welcome to the Landing Page!</h1>
        <p>Sign up now, or sign in to see your super secret dashboard!</p>
        <div className="card-actions">
          <Link to="/sign-up">
            <button className="btn sign-up-btn">Sign Up</button>
          </Link>
          <Link to="/sign-in">
            <button className="btn sign-in-btn">Sign In</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
