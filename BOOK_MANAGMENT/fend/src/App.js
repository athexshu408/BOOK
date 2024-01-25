// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/NavComponent/Navbar'; // Import your Navbar component
import Update from './pages/Update';
import Add from './pages/Add';
import Book from './pages/Book';
import Login from './pages/Validation/Login';
import Signup from './pages/Validation/Signup';
import BookList from './pages/BookList';
import ViewBook from './pages/ViewBook';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Navbar />  {/* Use the Navbar component here */}
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/home" element={<Book />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/booklist" element={<BookList />} />         
          <Route path="/viewbook/:id" element={<ViewBook/>} />
          <Route path="/update/:id" element={<Update/>} />
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
