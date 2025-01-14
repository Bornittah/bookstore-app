import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookAsync } from '../redux/books/book1';

function Form() {
  const [values, setValues] = useState({
    title: '',
    author: '',
  });
  const dispatch = useDispatch();
  const handleTitleValue = (e) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleAuthorValue = (e) => {
    setValues({ ...values, author: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addBookAsync({
        item_id: Math.random() * 1000,
        title: values.title,
        author: values.author,
        category: 'Fiction',
      }),
    );
  };

  return (
    <div className="form">
      <h1 className="form-title">ADD NEW BOOK</h1>
      <form onSubmit={onSubmit}>
        <input required value={values.title} name="title" onChange={handleTitleValue} type="text" placeholder="Book title" />
        <input onChange={handleAuthorValue} value={values.author} name="author" required type="text" placeholder="Author" />
        <button type="submit" className="form-btn">ADD NEW</button>
      </form>
    </div>
  );
}

export default Form;
