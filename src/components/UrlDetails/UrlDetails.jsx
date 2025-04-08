// src/components/UrlDetails/UrlDetails.jsx
import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as urlService from '../../services/urlService';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';


const UrlDetails = (props) => {
    const { user } = useContext(UserContext);
    const [url, setUrl] = useState(null);
    const { urlId } = useParams();
    console.log('urlId', urlId);
    useEffect(() => {
        const fetchUrl = async () => {
          const urlData = await urlService.show(urlId);
          setUrl(urlData);
        };
        fetchUrl(); // this will run when the effect function runs when we have a urlID
      }, [urlId]);
    
      // Verify the url state is set correctly:
      console.log('url state:', url);
  if (!url) return <main>Loading...</main>;

  const handleAddComment = async (commentFormData) => {
    // console.log('commentFormData', commentFormData);
    const newComment = await urlService.createComment(urlId, commentFormData);
    setUrl({ ...url, comments: [...url.comments, newComment] });
  };

  
    // return <main>Url Details</main>;
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
            </button>              </>
            )}
            </header>
            <p>{url.text}</p>
          </section>
      <section>
        <h2>Comments</h2>
        {/* Make use of the CommentForm component */}
        <CommentForm handleAddComment={handleAddComment}/>
           
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
      );
    
  };
  

  
  export default UrlDetails;
  