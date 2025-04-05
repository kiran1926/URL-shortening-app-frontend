import { useParams } from 'react-router';

const urlDetails = ()=> {
    const { urlId } = useParams();
    console.log('urlId', urlId);

    return <main>URL Details</main>;
}

export default urlDetails;