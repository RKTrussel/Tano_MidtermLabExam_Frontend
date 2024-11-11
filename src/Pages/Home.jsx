import { Container } from 'react-bootstrap';
import BookList from '../Components/BookList';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
          <h1 className="text-center"> Book Management System </h1>
            <Link to={`/addBook`} className="btn btn-primary">Add Book</Link>
          <hr/>
          <BookList />
        </Container>
    );
}

export default Home;