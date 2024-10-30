import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BookForm from '../Components/BookForm';


const EditBook = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
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
                <h3>Original Details of the Selected Book: </h3>
                <p className="fs-6">Title: {data.title}</p>
                <p className="fs-6">Author: {data.author}</p>
                <p className="fs-6">Published Year: {data.published_year}</p>
                <p className="fs-6">Genre: {data.genre}</p>
                <p className="fs-6">Description: {data.description}</p>
                <hr />
                <BookForm onSubmit={getData} formErrors={validationErrors} />
            </Container>
        </>
    );
}

export default EditBook;