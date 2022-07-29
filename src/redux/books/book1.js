/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBooksAsync = createAsyncThunk(
  'books/getBooksAsync',
  async () => {
    const response = await fetch(
      'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Bprdxe14OldQ8ZgxdRDq/books',
    );
    const data = await response.json();
    const entries = Object.entries(data);
    const books = entries.map((element) => ({
      id: element[0],
      title: Object.assign(...element[1]).title,
      author: Object.assign(...element[1]).author,
      category: Object.assign(...element[1]).category,
    }));
    return books;
  },
);

export const addBookAsync = createAsyncThunk(
  'books/addbooksasync',
  async (payload, thunkAPI) => {
    const response = await fetch(
      'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Bprdxe14OldQ8ZgxdRDq/books',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: payload.item_id,
          title: payload.title,
          author: payload.author,
          category: payload.category,
        }),
      },
    );
    await response.text();
    thunkAPI.dispatch(getBooksAsync());
    return payload;
  },
);

export const removeBookAsync = createAsyncThunk(
  'books/removeBooksAsync',
  async (id, thunkAPI) => {
    const response = await fetch(
      `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Bprdxe14OldQ8ZgxdRDq/books/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const book = await response.text();
    thunkAPI.dispatch(getBooksAsync());
    return book;
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(
      getBooksAsync.fulfilled,
      (books, action) => action.payload,
    );
    builder.addCase(addBookAsync.fulfilled, (books, action) => {
      books.push(action.payload);
    });
    builder.addCase(removeBookAsync.fulfilled,
      (books, action) => books.filter((book) => book.id !== action.payload));
  },
});

export const { removeBook, addBook } = booksSlice.actions;
export default booksSlice.reducer;
