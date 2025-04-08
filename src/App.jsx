import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import UrlList from './components/UrlList/UrlList';
import UrlDetails from './components/UrlDetails/UrlDetails';
import UrlForm from './components/UrlForm/urlForm';

import * as urlService from './services/urlService';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchAllUrls = async () => {
      const urlsData = await urlService.index();
      setUrls(urlsData);
    };
    if (user) fetchAllUrls();
  }, [user]);

  const handleAddUrl = async (urlFormData) => {
    const newUrl = await urlService.create(urlFormData);
    setUrls([newUrl, ...urls]);
    navigate('/urls');
  };

  const handleDeleteUrl = async (urlId) => {
    const deletedUrl = await urlService.deleteUrl(urlId);
    setUrls(urls.filter((url) => url._id !== deletedUrl._id));
    navigate('/urls');
  };

  const handleUpdateUrl = async (urlId, urlFormData) => {
    const updatedUrl = await urlService.update(urlId, urlFormData);
    setUrls(urls.map((url) => (urlId === url._id ? updatedUrl : url)));
    navigate(`/urls/${urlId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />

        {/* Protected routes */}
        {user && (
          <>
            <Route path='/urls' element={<UrlList urls={urls} />} />
            <Route path='/urls/new' element={<UrlForm handleAddUrl={handleAddUrl} />} />
            <Route path='/urls/:urlId' element={<UrlDetails handleDeleteUrl={handleDeleteUrl} />} />
            <Route path='/urls/:urlId/edit' element={<UrlForm handleUpdateUrl={handleUpdateUrl} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
