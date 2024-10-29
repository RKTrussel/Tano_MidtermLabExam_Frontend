import { Container, Stack, Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from './Pages/Home';
import AddBook from './Pages/AddBook';
import ViewBook from './Pages/ViewBook';
import EditBook from './Pages/EditBook';



function App() {
  return (
    <>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/editBook/:id" element={<EditBook />} />
            <Route path="/viewBook/:id" element={<ViewBook />} />
        </Routes>
    </>
  );
}

export default App;
