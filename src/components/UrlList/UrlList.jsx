import { Link } from 'react-router';

const UrlList = (props) => {
    return (
        <main>
            {props.urls.map((url) => (
                <Link key={url._id} to={`/urls/${url._id}`}>
                    <article>
                        <header>
                            <h2>{url.title}</h2>
                            <p>
                                {`${url.author.username} posted on
                                ${new Date(url.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{url.text}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default UrlList;