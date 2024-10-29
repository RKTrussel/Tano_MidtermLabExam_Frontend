import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../Components/BookForm';

const AddBook = () => {
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();

    const getData = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if(response.ok)
                navigate('/');
            else if(response.status === 422)
            {
                /* Nakaka-wtf moments: Imbes na numeric error lumabas, ang required error ang lumabas: I-FIX MO TO BUKAS PARA MAGING 100 KA PAREEEEE */
                const backendErrors = await response.json();
                console.log(backendErrors.validationErrors);
                setValidationErrors(backendErrors.validationErrors);
            }
        } catch(error) {
            console.log('Error has occured', error);
        }
    };
    return(
        <>
            <Container>
                <h1 className="text-center "> Add Book </h1> 
                <BookForm onSubmit={getData} formErrors={validationErrors}/>
            </Container>
        </>
    );
}

export default AddBook;