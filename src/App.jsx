import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllUrls = async () => {
      const urlsData = await urlService.index();
      seturls(urlsData);
    };
    if (user) fetchAllUrls();
  }, [user])
    //return code here
  }

  const [urls, seturls] = useState([]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (availale only to signed-in users) */}
            <Route path='/URLs' element={<urlList urls={urls}/>} />
            {/* Add this route! */}
            <Route
              path='/urls/:urlId'
              element={<urlDetails />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
            </>
        )}
      </Routes>
    </>
  );


export default App;
