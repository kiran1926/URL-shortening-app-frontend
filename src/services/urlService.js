const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/urls`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (urlId) => {
    try {
      const res = await fetch(`${BASE_URL}/${urlId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const create = async (urlFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(urlFormData),
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (urlId) => {
    try {
        const res = await fetch(`${BASE_URL}/${urlId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

async function update(urlId, urlFormData) {
    try {
        const res = await fetch (`${BASE_URL}/${urlId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Conten-Type': 'application/json',
            },
            body: JSON.stringify(urlFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteNote = async (urlId, noteId) => {
    try {
        const res = await fetch (`${BASE_URL}/${urlId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Conten-Type': 'application/json',
            },
            body: JSON.stringify(urlFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const updateNote = async (urlId, noteId, noteFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/notes/${noteId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteFormData),
          });
          return res.json();
        } catch (error) {
          console.log(error);
        }
      };
    
  export { 
    index,
    show,
    create,
    deleteUrl,
    update,
    deleteNote,
    updateNote,
  };