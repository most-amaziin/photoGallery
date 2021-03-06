const { Client } = require("pg");
require("dotenv").config({ path: __dirname + "/../.env" });

const client = new Client({
  user: 'ubuntu',
  host: '18.222.27.96',
  database: 'photogallery',
  password: 'hackreactor',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000
});

client.connect(err => {
  if (err) {
    console.log("error connecting to client at DB :", err);
  } else {
    console.log("connected to DB");
  }
});


// user clicks a product, send back all product photos object
const getProductPics = (productId, cb) => {
  client.query(
    `SELECT * FROM photos WHERE product_id = ${productId}`,
    (err, results) => {
      if (err) {
        // console.log(err);
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
        cb(err);
      } else {
        cb(null, result.rows);
      }
    }
  );
};

const save = (url, productId, cb) => {
  client.query(`insert into photos (url, product_id) values (${url},${productId})`, (err, result) => {
    if (err) {
      // console.log(err);
      cb(err,null);
    } else {
      cb(null,result);
    }
  })
};

const update = (url, productId, cb) => {
  client.query('select id from photos order by Id desc limit 1', (err, result) => {
    let randomId = Math.floor(Math.random()*result)
    client.query(`update photos set url = '${url}', product_id = ${productId} where id = ${randomId}`)
  }, (err, data) => {
    if (err) {
      // console.log(err);
      cb(err,null);
    } else {
      cb(null, data);
    }
  })
}

const Delete = (cb) => {
  client.query('select id from photos order by Id desc limit 1', (err, result) => {
    let randomId = Math.floor(Math.random()*result)
    client.query(`delete from photos where id = ${randomId}`)
  }, (err, data) => {
    if (err) {
      // console.log(err);
      cb(err,null);
    } else {
      cb(null, data);
    }
  })
}

module.exports = { getProductPics, getProductName, save, update, Delete};
