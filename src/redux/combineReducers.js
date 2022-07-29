import { combineReducers } from '@reduxjs/toolkit';
import statusReducer from './categories/categories';
import bookReducer from './books/book1';

const reducers = combineReducers({
  status: statusReducer,
  books: bookReducer,
});

export default reducers;
