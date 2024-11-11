import { Container, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BookForm from '../Components/BookForm';


const EditBook = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error("Error fetching book details: ", error));
    }, []);

    const getData = async (data) => {
        axios.put('http://127.0.0.1:8000/api/books/' + id, data)
            .then(response => {navigate('/')})
            .catch(error => {
                if(error.response && error.response.status === 422)
                {
                    const backEndErrors = error.response.data.validationErrors;
                    setValidationErrors(backEndErrors);
                } else
                    console.error('Error updating a book: ', error);
            })
    };

    return(
        <>
            <Container>
                <h1 className="text-center">Edit Book</h1>
                <hr />
                    <Button variant="primary" onClick={handleShow}>Show Details of the Book</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Original Details of the Book</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Title: {data.title}</p>
                            <p>Author: {data.author}</p>
                            <p>Published Year: {data.published_year}</p>
                            <p>Genre: {data.genre}</p>
                            <p>Description: {data.description}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                <hr />
                <BookForm onSubmit={getData} formErrors={validationErrors} />
            </Container>
        </>
    );
}

export default EditBook;