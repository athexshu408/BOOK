import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: "",
        desc: "",
        cover: "",
        author: "",
        price: "",
        type_book: "",
        gener_book: "",
        pages: "",
        publication: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8800/userdetails/${id}`)
            .then(res => {
                setUser(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [id]);

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/userss/${id}`, user);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'gray' }}>
            <div style={{ width: '50%', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }}>
                <form onSubmit={handleClick}>
                    <h2 style={{ margin: 'auto', textAlign: 'center' }}>Update book</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder='Enter book Name' className='form-control' value={user.name} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" name="author" placeholder='Author' className='form-control' value={user.author} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" name="desc" placeholder='Description' className='form-control' value={user.desc} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" placeholder='Price' className='form-control' value={user.price} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="type_book">Type of Book</label>
                        <input type="text" id="type_book" name="type_book" placeholder='Type of book' className='form-control' value={user.type_book} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="gener_book">Genre of Book</label>
                        <input type="text" id="gener_book" name="gener_book" placeholder='Genre of book' className='form-control' value={user.gener_book} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="pages">Number of Pages</label>
                        <input type="text" id="pages" name="pages" placeholder='Number of pages' className='form-control' value={user.pages} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="publication">Publication</label>
                        <input type="text" id="publication" name="publication" placeholder='Publication' className='form-control' value={user.publication} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="cover">Enter valid Cover URL</label>
                        <input type="text" id="cover" name="cover" placeholder='Cover URL' className='form-control' value={user.cover} onChange={handleChange} />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', width: '100%' }}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update;
