// src/components/UrlForm/UrlForm.jsx
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as urlService from '../../services/urlService';

const UrlForm = (props) => {
     // Destructure urlId from the useParams hook, and console log it
  const { urlId } = useParams();
  console.log(urlId);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

// src/components/UrlForm/UrlForm.jsx

const handleSubmit = (evt) => {
    evt.preventDefault();
    if (urlId) {
      props.handleUpdateUrl(urlId, formData);
    } else {
      props.handleAddUrl(formData);
    }
  };
  

  useEffect(() => {
    const fetchUrl = async () => {
      const urlData = await urlService.show(urlId);
      setFormData(urlData);
    };
    if (urlId) fetchUrl();
    return () => setFormData({ title: '', text: '', category: 'News' });
  }, [urlId]);


  return (
    <main>
      <h1>{urlId ? 'Edit Url' : 'New Url'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='News'>News</option>
          <option value='Games'>Games</option>
          <option value='Music'>Music</option>
          <option value='Movies'>Movies</option>
          <option value='Sports'>Sports</option>
          <option value='Television'>Television</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default UrlForm;
