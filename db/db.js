const { Client } = require("pg");
require("dotenv").config({ path: __dirname + "/../.env" });

const client = new Client({
  user: 'andersaustin',
  // host: 'http://localhost',
  database: 'photogallery',
  password: 'hackreactor'
  // port: 3005
});

client.connect(err => {
  if (err) {
    console.log("error connecting to client at DB :", err);
  } else {
    console.log("connected to server at DB");
  }
});

// user clicks a product, send back all product photos object
const getProductPics = (productId, cb) => {
  client.query(
    `SELECT * FROM photos WHERE product_id = ${productId}`,
    (err, results) => {
      if (err) {
        console.log(
          "could not load pictures by product id :",
          productId,
          " error:",
          err
        );
        cb(err);
      } else {
        cb(null, results.rows);
      }
    }
  );
};

// user clicks a photo, send back one photo object
const getProductName = (productId, cb) => {
  client.query(
    `SELECT name FROM products WHERE id = ${productId}`,
    (err, result) => {
      if (err) {
        console.log(
          "could not load product name by product id :",
          productId,
          " error:",
          err
        );
        cb(err);
      } else {
        console.log("4YYY", result.rows);
        cb(null, result.rows);
      }
    }
  );
};

// const seed = (insertValues, cb) => {
//   client.query(`INSERT INTO photos (url, product_id) VALUES ${insertValues}`, (err, result) => {
//     if (err) {
//       console.log('err');
//       cb(err);
//     } else {
//       cb(null, 'success')
//     }
//   });

// };

module.exports = { getProductPics, getProductName, seed };
