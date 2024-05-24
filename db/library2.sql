CREATE DATABASE book_library_v2;

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

create table contribution (
    contribution_id serial primary key,
    contribution_title varchar(300) NOT NULL
)

create table author_contribution (
    contribution_id int NOT NULL,
    author_id int NOT NULL,
    CONSTRAINT fk_contribution FOREIGN KEY (role_id) REFERENCES contribution(contribution_id),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author(author_id)
)

create table subject (
    subject_id serial primary key,
    subject_title varchar(100) not null
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

create table subject_book (
    subject_id int not null,
    book_id int not null,
    CONSTRAINT fk_genre FOREIGN KEY(genre_id) REFERENCES genre(genre_id),

    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES book(book_id)
);