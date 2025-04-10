import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import urlList from '../../URL-shortening-app-frontend/frontend/src/components/urlList/urlList';
import * as urlService from './services/urlService';
import { useContext, useState, useEffect } from 'react';
import urlDetails from '../../URL-shortening-app-frontend/frontend/src/components/urlDetails/urlDetails';

function App() {
  // const { user } = useContext(UserContext);

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

