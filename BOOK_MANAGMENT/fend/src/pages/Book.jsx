import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Book = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get("http://localhost:8800/book");
                setBooks(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Call the function
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/book/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ fontSize: '20px', textAlign: 'center', color: 'red', marginTop: '20px' }}>Error: {error}</div>;
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{ color: 'blue', fontSize: '24px', textAlign: 'center' }}>Pustakam</h1>
            <button style={{ backgroundColor: 'blue', color: 'white', fontSize: '16px', width: '600px', height: '40px', margin: 'auto' ,textAlign: 'center'}}>
                <Link to="/add" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>Add new Book</Link>
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {books.map((book) => (
                    <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px', backgroundColor: '#b0edf3f9' }}>
                        <div style ={{textAlign: 'center'}} >
                            {book.cover && (
                                <Link to={`/viewbook/${book.id}`}>
                                    <div style={{ margin:'auto',maxWidth: '70%', maxHeight: '200px', overflow: 'hidden' ,textAlign: 'center'}}>
                                        <img
                                            src={book.cover}
                                            alt=""
                                            style={{ maxWidth: '70%', height: 'auto', objectFit: 'cover',textAlign: 'center' }}
                                        />
                                    </div>
                                </Link>
                            )}
                            <h2 style={{ fontSize: '18px' }}>Name: {book.name ? book.name : "Placeholder Name"}</h2>
                            <h2 style={{ fontSize: '16px' }}>Author: {book.author}</h2>
                            
                            <h2 style={{ fontSize: '12px' }}>Price: {book.price}</h2>
                            <button style={{ backgroundColor: 'red', color: 'white', fontSize: '16px', marginBottom: '10px',borderRadius: "8px" }} onClick={() => handleDelete(book.id)}>Delete</button>
                            <button style={{ backgroundColor: 'green', color: 'white', fontSize: '14px', marginBottom: '10px',borderRadius: "8px" }}>
                                <Link to={`/update/${book.id}`} style={{ textDecoration: 'none', color: 'white', fontSize: '14px' }}>Update</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    );
}

export default Book;
