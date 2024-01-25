import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        name: "",
        desc: "",
        author: "",
        price: null,
        type_book:"",
        gener_book:"",
        pages:"",
        publication:"",
        cover: "",

    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
        //... sprade operator use for copy stae and update prop
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/book", book)
            navigate("/home")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' ,width: '30%', backgroundColor:'#D3D3D3'}}>
                <h1 style={{fontSize:'35px', fontFamily:'fantasy'}}>ADD NEW BOOK</h1>
                <input type="text" placeholder='Name' onChange={handleChange} name="name" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Description' onChange={handleChange} name="desc" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Author' onChange={handleChange} name="author" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="number" placeholder='Price' onChange={handleChange} name="price" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Book Type' onChange={handleChange} name="type_book" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Book Gener' onChange={handleChange} name="gener_book" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='No of pages' onChange={handleChange} name="pages" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Publication' onChange={handleChange} name="publication" style={{ marginBottom: '10px', padding: '5px' }} />
                <input type="text" placeholder='Cover' onChange={handleChange} name="cover" style={{ marginBottom: '10px', padding: '5px' }} />

                <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '3px' }} onClick={handleClick}>ADD NEW BOOK</button>
            </div>
        </div>
    );
}

export default Add;
