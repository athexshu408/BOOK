// ViewBook.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function ViewBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/view/${id}`)
      .then((res) => {
        console.log(res);
        setBook(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  };

  const coverImageStyle = {
    width: "200px",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  const bookDetailsStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const boldStyle = {
    fontWeight: "bold",
  };

  const backButtonContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const backButtonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "#fff",
    //transition: "background-color 0.3s",
  };

  const backButtonArrowStyle = {
    marginRight: "5px",
  };

  const backButtonHoverStyle = {
    backgroundColor: "#2980b9",
  };

  const updateButtonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold",
    backgroundColor: "#2ecc71",
    color: "#fff",
    cursor: "pointer",
  };

  const handleUpdateClick = () => {
    // Redirect to the update route with the book ID
    navigate(`/update/${id}`);
  };

  return (
    <div style={containerStyle}>
      <div>
        <p>
          <img
            style={coverImageStyle}
            src={book.cover}
            alt="Book Cover"
          />
        </p>
        <div style={bookDetailsStyle}>
          <p>
            <span style={boldStyle}>Name:</span> {book.name || "Placeholder Name"}
          </p>
          <p>
            <span style={boldStyle}>Gener:</span> {book.gener_book || "Placeholder Name"}
          </p>
          <p>
            <span style={boldStyle}>Pages:</span> {book.pages || "Placeholder Name"}
          </p>

          <p>
            <span style={boldStyle}>Description:</span>{" "}
            {book.desc || "Placeholder Description"}
          </p>
          <p>
            <span style={boldStyle}>Price:</span> {book.price || "Placeholder Price"}
          </p>
        </div>
        <div style={backButtonContainerStyle}>
          <Link
            to="/booklist"
            style={backButtonStyle}
            onMouseOver={(e) => (e.target.style = { ...backButtonStyle, ...backButtonHoverStyle })}
            onMouseLeave={(e) => (e.target.style = backButtonStyle)}
          >
            <span style={backButtonArrowStyle}>&larr;</span> Back
          </Link>
          <button style={updateButtonStyle} onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
