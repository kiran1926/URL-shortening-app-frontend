import './Landing.css';

const Landing = () => {
  return (
    <main className="landing">
      <div className="card">
        <h1>Welcome to the Landing Page!</h1>
        <p>Sign up now, or sign in to see your super secret dashboard!</p>
        <div className="card-actions">
          <button className="btn sign-up-btn">Sign Up</button>
          <button className="btn sign-in-btn">Sign In</button>
        </div>
      </div>
    </main>
  );
};

export default Landing;
