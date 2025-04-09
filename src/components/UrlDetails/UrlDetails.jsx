import { useParams, Link } from 'react-router';
import * as urlService from '../../services/urlService';
import { useEffect, useState, useContext } from 'react';
import { hydrateRoot } from 'react-dom/client';
import UrlForm from '../UrlForm/UrlForm';
import { UserContext } from '../../contexts/UserContext';

const UrlDetails = (props) => {
    const { urlId } = useParams();
    const { user } = useContext(UserContext);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
            const urlData = await urlService.show(urlId);
            setUrl(urlData);
        };
        fetchUrl();
    }
    , [urlId]);
    console.log('url state', url);

    if (!url) return <main>URL Details</main>;
    
    return (
        <main>
            <section>
                <header>
                    <p>{url.category.toUpperCase()}</p>
                    <h1>{url.title}</h1>
                    <p>
                        {`${url.author.username} posted on
                        ${new Date(url.createdAt).toLocaleDateString()}`}
                    </p>
                    {url.author._id === user._id && (
                        <>
                        <Link to={`/urls/${urlId}/edit`}>Edit</Link>
                        <button onClick={() => props.handleDeleteUrl(urlId)}>
                            Delete
                        </button>
                        </>
                    )}
                </header>
                <p>{url.text}</p>
            </section>
            <section>
                <h2>Notes</h2>
                {!url.notes.length && <p>There are no notes.</p>}
                {url.notes.map((notes)=> (
                    <article key={notes._id}>
                        <header>
                            <p>
                                {`${note.author.username} posted on
                                ${new Date(note.createdAt).toLocaleDateString()}`}
                            </p>
                            {url.author._id === user._id && (
                        <>
                        <Link to={`/urls/${urlId}/notes/${note._id}/edit`}>Edit</Link>
                        <button onClick={() => props.handleDeleteNote(noteId)}>
                            Delete
                        </button>
                        </>
                    )}
                    </header>
                    <p>{note.text}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

const handleDeleteNote = async (noteId) => {
    console.log('noteId:', noteId);
    setUrl({
        ...url,
        notes: url.notes.filter((note) => note._id !== noteId),
    });
};

export default UrlDetails;