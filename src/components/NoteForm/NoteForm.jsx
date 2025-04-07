import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as urlService from '../../services/urlService';

const { urlId, noteId } = useParams();
console.log(hootId, noteId);

useEffect(() => {
    const fetchUrl = async () => {
        setFormData(urlData.notes.find((note) => note._id === noteId));
    };
    if (urlId && noteId) fetchUrl();
}, [urlId, noteId]);

const navigate = useNavigate();

const handleSubmit = (evt) => {
    evt.preventDefault();
    if (urlId && noteId) {
        urlService.updateNote(urlId, noteId, formData);
        navigate(`/urls/${urlId}`);
    } else {
        props.handleAddNote(formData);
    }
    setFormData({ text: ''});
};