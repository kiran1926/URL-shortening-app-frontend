import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as urlService from '../../services/urlService';

const urlForm = (props) => {
    const { urlId } = useParams();
    console.log(urlId);
    const [formData, setFormData] = useState({
    originalUrl: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (urlId) {
        props.handleAddUrl(urlId, formData);
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
    return () => setFormData({ originalUrl: ''});
}, [urlId]);


  return (
    <main>
        <h1>{urlId ? 'Edit URL' : 'New URL'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='url-input'>Original URL</label>
        <input
          required
          type='url'
          name='originalUrl'
          id='url-input'
          value={formData.originalUrl}
          onChange={handleChange}
        />
        <button type='submit'>Shorten URL</button>
      </form>
    </main>
  );
};

export default urlForm;