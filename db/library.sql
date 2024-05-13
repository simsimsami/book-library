CREATE DATABASE book_library;

create table publisher (
    publisher_id serial primary key,
    publisher_title varchar(500)
);

create table author (
    author_id serial primary key,
    author_first_name varchar(300) NOT NULL,
    author_last_name varchar(300) NOT NULL,
    author_title varchar(30) not null
);

create table genre (
    genre_id serial primary key,
    genre_title varchar(100) not null
);

create table book (
    book_id serial primary key,
    book_title varchar(400) not null,
    book_release date not null,
    publisher_id int not null,
    ISBN varchar(300) not null
);

create table book_author (
    book_id int not null,
    author_id int not null,
    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES book(book_id),

    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author(author_id)
);

create table genre_book (
    genre_id int not null,
    book_id int not null,
    CONSTRAINT fk_genre FOREIGN KEY(genre_id) REFERENCES genre(genre_id),

    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES book(book_id)
);

-- Show publisher books? Or books under a specific publisher

Select 
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
WHERE publisher.publisher_id = 1
ORDER BY book.book_id ASC;