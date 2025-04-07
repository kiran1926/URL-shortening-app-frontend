import { useContext, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import urlDetails from './components/urlDetails/urlDetails';
import urlList from './components/urlList/urlList';
import urlForm from './components/urlForm/urlForm';

import * as urlService from './services/urlService';

import { UserContext, useEffect, useEffect } from 'react';

const App = () => {
  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([]);
  const naivate = useNavigate();

  const handleAddUrl = async (urlFormData) => {
    const newUrl = await urlService.create(urlFormData);
    setUrls([newUrl, ...urls]);
    useNavigate('/urls');
  }

  useEffect(() => {
    const fetchAllUrls = async () => {
      const urlsData = await urlService.index();
      seturls(urlsData);
    };
    if (user) fetchAllUrls();
  }, [user])
    //return code here
  }

const handleDeleteUrl = async (urlId) => {
  console.log('urlId', urlId);
  setUrls(urls.filter((url) => urlDetails._id !== urlId));
  useNavigate('/urls');
};

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (availale only to signed-in users) */}
            <Route path='/urls' element={<urlList urls={urls}/>} />
            <Route 
              path='/urls/new'
              element={<urlForm handleAddUrl={handleAddUrl} />}
            />
            {/* Add this route! */}
            <Route
              path='/urls/:urlId'
              element={<urlDetails handleDeleteUrl={handleDeleteUrl}/>}
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
