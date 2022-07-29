/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Book from './Book';
import Form from './Form';
import { getBooksAsync } from '../redux/books/book1';

function BookList() {
  const dispatch = useDispatch();

  const book1 = useSelector((state) => state.entities.books);

  useEffect(() => {
    dispatch(getBooksAsync());
  }, []);

  return (
    <>
      <div>
        <Form />
      </div>
      <ul>
        {book1.map((book) => (
          <Book title={book.title} item_id={book.id} key={book.id} author={book.author} />
        ))}
      </ul>
    </>
  );
}

export default BookList;
