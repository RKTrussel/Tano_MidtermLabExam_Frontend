import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BookDetails from '../Components/BookDetails';

const ViewBook = () => {
    const { id } = useParams();
    const [selectedBook, setSelectedBook] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedBook(data);
            })
            .catch(error => console.error("Error fetching book details: ", error));
    }, []);



    return(
        <>
            <Container> 
                <h1 className="text-center">Book Details</h1>
                <hr/>
                <BookDetails selectedBook={selectedBook}/>
            </Container>
        </>
    );
}

export default ViewBook;