import { useContext, useState } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import urlDetails from './components/urlDetails/urlDetails';
import urlList from './components/urlList/urlList';

import * as urlService from './services/urlService';

import { UserContext, useEffect, useEffect } from 'react';

const App = () => {
  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchAllUrls = async () => {
      const urlsData = await urlService.index();
      seturls(urlsData);
    };
    if (user) fetchAllUrls();
  }, [user])
    //return code here
  }


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (availale only to signed-in users) */}
            <Route path='/urls' element={<urlList urls={urls}/>} />
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
