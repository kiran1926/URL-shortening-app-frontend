// src/services/urlService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/urls`;
// TODO: do User stories for trello AAU, under component hierarchy diagram
// TODO:



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
  
// src/services/urlService.js

const createComment = async (urlId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${urlId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
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
  
// src/services/urlService.js

const update = async(urlId, urlFormData) => {
// async function update(urlId, urlFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${urlId}`, {
        method: 'PUT',
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
  }
  
  export {
    index,
    show,
    create,
    createComment,
    deleteUrl,
    update,
  };
  
  
  
  
  