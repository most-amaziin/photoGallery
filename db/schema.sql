-- DROP DATABASE IF EXISTS photoGallery;
-- create database photoGallery;
-- connect photoGallery; 

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR (255) NOT NULL,
  product_id INT not null
);

CREATE TABLE pics (
  id serial PRIMARY key,
  url varchar(255) NOT NULL,
  product_id int not null
)
-- CREATE TABLE products (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR (255) NOT NULL
-- );