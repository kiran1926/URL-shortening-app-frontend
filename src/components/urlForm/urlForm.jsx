import { useState } from 'react';

const urlForm = (props) => {
  const [formData, setFormData] = useState({
    originalUrl: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddUrl(formData);
   
  };

  return (
    <main>
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