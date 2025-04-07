import { useParams } from 'react-router';
import * as urlService from '../../services/urlService';
import { useEffect, useState, useContext } from 'react';
import { hydrateRoot } from 'react-dom/client';
import urlForm from '../urlForm/urlForm';
import { UserContext } from '../../contexts/UserContext';

const urlDetails = (props) => {
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
                        ${new Date(hydrateRoot.createdAt).toLocaleDateString()}`}
                    </p>
                    {url.author.id === user._id && (
                        <>
                        <button onClick={() => props.handleDeleteUrl(urlId)}>
                            Delete
                        </button>
                        </>
                    )}
                </header>
                <p>{url.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                {!url.comments.length && <p>There are no comments.</p>}
                {url.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {`${comment.author.username} posted on
                                ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                    <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default urlDetails;