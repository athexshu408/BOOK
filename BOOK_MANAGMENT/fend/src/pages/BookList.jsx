import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function BookList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8800/book')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm("Do you want to delete this record?");

    if (confirmDelete) {
      axios.delete(`http://localhost:8800/book/${id}`)
        .then(res => {
          alert("Record Deleted. Kindly reload the page.");
          navigate('/booklist');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'gray' }}>
      <Link to="/add">
        <button style={{ margin: '10px', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none',width:'400px',borderRadius: "5px" }}>Add New Book</button>
      </Link>
      <table style={{ borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr style={{ textAlign: 'center', background: '#F2f2f2',height:'50px' }}>
            <th>Cover</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>No of Pages</th>
            <th>Genre of Book</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{  background: '#F1DAF0' }}>
          {data.map((d, i) => (
            <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd' }}><img style={{ width: '70px', height: '100px' }} src={d.cover} alt="Book Cover" /></td>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{d.name}</td>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{d.author}</td>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{d.pages}</td>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{d.gener_book}</td>
              <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>
                <Link to={`/update/${d.id}`}>
                  <button style={{ margin: '5px', padding: '5px', backgroundColor: 'blue', color: 'white', border: 'none' ,borderRadius: "5px"}}>Update</button>
                </Link>
                <button style={{ margin: '5px', padding: '5px', backgroundColor: 'red', color: 'white', border: 'none',borderRadius: "5px" }} onClick={() => handleDelete(d.id)}>Delete</button>
                <Link to={`/viewbook/${d.id}`}>
                  <button style={{ margin: '5px', padding: '5px', backgroundColor: 'blue', color: 'white', border: 'none',borderRadius: "5px" }}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
