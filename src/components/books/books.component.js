import React, { useEffect, useState } from "react";

import "./books.component.css";

const GOOGLE_URL = "https://www.googleapis.com/books/v1/volumes";
const DEFAULT_IMAGE = "https://via.placeholder.com/125x180";

function fetchBooks(query) {
  return fetch(GOOGLE_URL + query).then((data) => data.json());
}

function getImage(book) {
  const { imageLinks } = book.volumeInfo;

  if (imageLinks && imageLinks.thumbnail) return imageLinks.thumbnail;

  return DEFAULT_IMAGE;
}

function CardBook({ book }) {
  return (
    <div className="books__card">
      <div className="books__card-wrapper">
        <img src={getImage(book)} alt="Book thumbnail" height="182" />
        <h2>{book.volumeInfo.title}</h2>
      </div>

      <small className="books__card-text">{book.volumeInfo.description}</small>
    </div>
  );
}

export default function Books() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    function handleRoutingEvent() {
      fetch(GOOGLE_URL + window.location.search);
    }

    window.addEventListener("single-spa:routing-event", handleRoutingEvent);

    return () =>
      window.removeEventListener(
        "single-spa:routing-event",
        handleRoutingEvent
      );
  }, []);

  useEffect(() => {
    fetchBooks(window.location.search).then((data) => setBooks(data.items));
  }, []);

  if (books === null) {
    return <div className="books__info">Loading...</div>;
  }

  if (books === undefined) {
    return <div className="books__info">Can't find any book (≥o≤)</div>;
  }

  return (
    <div className="books">
      {books.map((book) => (
        <CardBook key={book.id} book={book} />
      ))}
    </div>
  );
}
