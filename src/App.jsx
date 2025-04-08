import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext.jsx';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import urlDetails from './components/urlDetails/urlDetails';
import urlList from './components/urlList/urlList';
import urlForm from './components/urlForm/urlForm';
import NoteForm from './components/NoteForm/NoteForm';



import * as urlService from './services/urlService';


const App = () => {
  console.log(UserContext);

  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([]);
  const naivate = useNavigate();

  const handleAddUrl = async (urlFormData) => {
    const newUrl = await urlService.create(urlFormData);
    setUrls([newUrl, ...urls]);
    useNavigate('/urls');
  }

  const handleUpdateUrl = async (urlId, urlFormData) => {
    const updateUrl = await urlService.update(urlId, urlFormData);
    setUrls(urls.map((url) => (urlId === url._id ? updatedUrl : url)));
    useNavigate(`/urls/${urlId}`);
  };

  useEffect(() => {
    const fetchAllUrls = async () => {
      const urlsData = await urlService.index();
      seturls(urlsData);
    };
    if (user) fetchAllUrls();
   [user]})
    //return code here
  

const handleDeleteUrl = async (urlId) => {
  const deleteUrl = await urlService.deleteUrl(urlId);
  setUrls(urls.filter((url) => url._id !== deleteUrl._id));
  useNavigate('/urls');
}


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (availale only to signed-in users) */}
            <Route 
              path='/urls' 
              element={<urlList urls={urls}/>} 
            />
            <Route 
              path='/urls/new'
              element={<urlForm handleAddUrl={handleAddUrl} />}
            />
            <Route
              path='/urls/:urlId'
              element={<urlDetails handleDeleteUrl={handleDeleteUrl}/>}
            />
            <Route
              path='/urls/:urlId/edit'
              element={<urlForm />}
              />
            <Route
              path='/urls/:urlId/edit'
              element={<urlForm handleUpdateUrl={handleAddUrl} />}
            />
            <Route
              path='/urls/:urlId/notes/:noteId/edit'
              element={<NoteForm />}
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
};



export default App;
