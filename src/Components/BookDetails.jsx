import { Link } from 'react-router-dom';

const BookDetails = (props) => {
    return (
        <>
            <div className="fs-5">
                <p>Title: {props.selectedBook.title}</p>
                <p>Author: {props.selectedBook.author}</p>
                <p>Published Year: {props.selectedBook.published_year}</p>
                <p>Genre: {props.selectedBook.genre}</p>
                <p>Description: {props.selectedBook.description}</p>
            </div>

            <Link to="/" className="btn btn-primary" role="button">Go Back To Home</Link>
        </>
    ); 
}

export default BookDetails;