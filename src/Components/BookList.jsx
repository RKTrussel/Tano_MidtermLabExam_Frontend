import { useState, useEffect } from 'react';
import { Stack, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooks();
    },[]);

    const fetchBooks = () => {
        fetch('http://127.0.0.1:8000/api/books')
            .then(response => response.json())
            .then(data => {
                if(data.books)
                {
                    setAllBooks(data.books);
                    setError('');
                } else {
                    setError(data.error);
                }
            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    const handleDelete = (e, bookId) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/books/${bookId}`)
            .then(res => {
                 window.location.reload();
            })
            .catch(error => console.log("Network error: ", error));
        
    }
    


    return(
            <>
                {error && (
                    <h1>
                        {error}
                    </h1>
                )}

                <Stack gap={3}>
                    {allBooks.map(book => (
                        <div className="border rounded" key={book.id}>
                            <Stack direction="horizontal" gap={3} className="m-4">
                                <div>
                                    <label className="fs-4 d-block">{book.title}</label>
                                    <label className="fs-6 d-block">
                                        <em>
                                            Author: {book.author}
                                        </em>
                                    </label>
                                </div>
                                <ButtonGroup className="ms-auto">
                                    <Link to={`/viewBook/${book.id}`} className="btn btn-primary">View</Link>
                                    <Link to={`/editBook/${book.id}`} className="btn btn-secondary">Edit</Link>
                                    <Button variant="danger" onClick={(e) => handleDelete(e, book.id)}>Delete</Button>
                                </ButtonGroup>
                            </Stack>
                        </div>
                    ))}
                </Stack>
            </>
    );
}

export default BookList;