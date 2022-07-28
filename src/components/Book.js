import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { removeBook } from '../redux/books/mbuks';

function Book({ id, title, author }) {
  const dispatch = useDispatch();

  const deleteBook = () => {
    dispatch(removeBook(id));
  };

  return (
    <>
      <li>
        <div className="Book">
          <input type="checkbox" />
          {' '}
          <div className="tinga">
            {title}
            {'  '}
            {author}
          </div>
          {' '}
          <Button name="Remove" clickMe={deleteBook} />
        </div>
        <hr />
      </li>
    </>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};

export default Book;
