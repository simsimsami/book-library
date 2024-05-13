import pg from 'pg';

const { Client, Pool } = pg;
import * as dotenv from 'dotenv';
dotenv.config({});

const DB_USER = String(process.env.DB_USER);
const DB_PASSWORD = String(process.env.DB_PASSWORD);
const DB_HOST = String(process.env.DB_HOST);
const DB_DATABASE = String(process.env.DB_DATABASE);
const DB_PORT = String(process.env.DB_PORT);

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
});

async function query() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT current_user');
    const current_user = rows[0]['current_user'];
    console.log(current_user);
  } catch {
    console.error(err);
  } finally {
    client.release();
  }
}

export async function get_Authors() {
  const client = await pool.connect();

  try {
    const query = await client.query('Select * from author');
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_Author(authorId) {
  const client = await pool.connect();
  try {
    const query = await client.query(
      `SELECT * from author where author_id = ${authorId}`,
    );
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_Books() {
  const client = await pool.connect();
  try {
    const query = await client.query('SELECT * from book');
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_Book(bookId) {
  // get information about and around the book
  const client = await pool.connect();
  try {
    const query = await client.query(
      `select
      book.book_id,
      book.book_title,
      genre.genre_title,
      publisher.publisher_title,
      book.isbn,
      book.book_release,
      author.author_first_name,
      author.author_last_name
      from book
      join genre_book on genre_book.book_id = book.book_id
      join genre on genre.genre_id = genre_book.genre_id
      join book_author on book_author.book_id = book.book_id
      join author on author.author_id = book_author.author_id
      join publisher on book.publisher_id = publisher.publisher_id
      WHERE book.book_id = ${bookId};`,
    );
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

// publishers

export async function get_Publishers() {
  const client = await pool.connect();
  try {
    const query = await client.query('SELECT * FROM publisher');
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_Publisher(pubId) {
  const client = await pool.connect();
  try {
    const query = await client.query(
      `Select 
      book.book_id,
      book.book_title,
      book.book_release,
      author.author_first_name,
      author.author_last_name,
      book.isbn,
      genre.genre_title
      from book
      join book_author on book_author.book_id = book.book_id
      join author on author.author_id = book_author.author_id
      join publisher on publisher.publisher_id = book.publisher_id
      join genre_book on genre_book.book_id = book.book_id
      join genre on genre.genre_id = genre_book.genre_id
      WHERE publisher.publisher_id = ${pubId}
      ORDER BY book.book_id ASC;`,
    );
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

// genre - genre get id sucks major ass. Need to change it
export async function get_Genres() {
  const client = await pool.connect();
  try {
    const query = await client.query('SELECT * FROM genre');
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_Genre(genreId) {
  const client = await pool.connect();
  try {
    const query = await client.query(
      `SELECT * FROM genre WHERE genre_id = ${genreId}`,
    );
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

export async function get_AuthorBooks(authorId) {
  const client = await pool.connect();
  try {
    const query = await client.query(
      `SELECT
      book.book_id,
      book.book_title,
      book.book_release,
      book.publisher_id,
      author.author_first_name,
      author.author_last_name,
      book.isbn
      from book
      join book_author 
      on book_author.book_id = book.book_id
      join author
      on book_author.author_id = author.author_id
      where author.author_id = ${authorId};`,
    );
    return query;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}
