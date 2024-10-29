import { Button, Form, Stack } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookForm = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [validateForm, setValidateForm] = useState(false);

    const handleInputChange = (setter, fieldName) => (event) => {
        setter(event.target.value);

        if(props.formErrors[fieldName])
        {
            props.onClearError(fieldName);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            title,
            author,
            'published_year': publishedYear,
            genre,
            description,
        }

        props.onSubmit(data);
        setValidateForm(true);
    }

    return (
        <>
            <Form noValidate validated={validateForm} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleInputChange(setTitle, 'title')}
                        isInvalid={!!props.formErrors.title}
                        required
                        />
                    <Form.Control.Feedback type="invalid">{props.formErrors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        onChange={handleInputChange(setAuthor, 'author')}
                        isInvalid={!!props.formErrors.author}
                        required
                        />
                    <Form.Control.Feedback type="invalid">{props.formErrors.author}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Published Year</Form.Label>
                    <Form.Control
                        type="number"
                        value={publishedYear}
                        onChange={handleInputChange(setPublishedYear, 'published_year')}
                        isInvalid={!!props.formErrors.published_year}
                        required
                        />
                    <Form.Control.Feedback type="invalid">{props.formErrors.published_year}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        value={genre}
                        onChange={handleInputChange(setGenre, 'genre')}
                        isInvalid={!!props.formErrors.genre}
                        required
                        />
                    <Form.Control.Feedback type="invalid">{props.formErrors.genre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={description}
                        rows={5}
                        onChange={handleInputChange(setDescription, 'description')}
                        isInvalid={!!props.formErrors.description}
                        required
                        />
                    <Form.Control.Feedback type="invalid">{props.formErrors.description}</Form.Control.Feedback>
                </Form.Group>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" type="submit">Submit</Button>
                    <Link to="/" className="btn btn-secondary" role="button">Cancel</Link>
                </Stack>
            </Form>
        </>
    );
}

export default BookForm;