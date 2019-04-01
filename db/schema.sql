CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR (255) NOT NULL,
  product_id INT REFERENCES products(id)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL
);