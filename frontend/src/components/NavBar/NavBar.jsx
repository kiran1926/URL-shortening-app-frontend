return (
    <nav>
        {user ? (
            <ul>
                <li><Link to='/'>HOME</Link></li>
                <li><Link to='/urls'>URLs</Link></li>
                <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
            </ul>
        ) : (
            <ul>
                <li><Link to='/'>HOME</Link></li>
          <li><Link to='/sign-in'>SIGN IN</Link></li>
          <li><Link to='/sign-up'>SIGN UP</Link></li>
            </ul>
        )}
    </nav>
);