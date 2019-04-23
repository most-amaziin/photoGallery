const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });
const imageArray = require('../imageData');
const fs = require('file-system');

const bodyParser = require("body-parser");
//postgres
const db = require("../db/db");
//mongo
// const db = require('../db/mongoDB');

app.use(bodyParser.json({ urlencoded: false }));
app.use(cors());
app.use(express.static("dist"));

// let nextRow;

// fs.readFile('/home/andersaustin/Documents/HR_Github_Repos/SDC/photoGallery/photos.csv','utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     let blah = data.split('\n');
//     nextRow = blah.length;
//   }
// })

//user clicks a product, request all product photos
app.get("/photos", (req, res) => {
  const productId = req.query.id;
  db.getProductPics(productId, (error, results) => {
    if (error) {
      console.log("server failed to load photos ", error);
      res.end();
    } else {
      // console.log("5ZZZ", results);
      res.send(results);
    }
  });
});

//user clicks a product, request product name
app.get("/product/id", (req, res) => {
  const productId = req.query.id;
  db.getProductName(productId, (error, result) => {
    if (error) {
      console.log("server failed to get product name ", error);
      res.end();
    } else {
      // console.log("5YYY", result);
      res.send(result);
    }
  });
});

let prodId = 0;

app.post('/post', (req, res) => {
  let id = Math.floor(Math.random()*10000000)
  let image = imageArray.imageArray[Math.floor(Math.random()*334)][1]
  db.save(image, id, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } else {
      res.send(data)
    }
  })
})

app.put('/put', (req, res) => {
  let id = Math.floor(Math.random()*10000000)
  let image = imageArray.imageArray[Math.floor(Math.random()*334)][1]

  db.update(image, id, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } else {
      res.send(data)
    }
  })
});

app.delete('/delete', (req, res) => {
  db.Delete((err, data) => {
    if (err) {
      console.log(err)
      res.end();
    } else {
      res.send(data)
    }
  });
});

//seed function
app.post('/seed', (req, res) => {
  let i1 = '';
  let insertString = '';
  const imagesArray = imageArray.imageArray

  for (let i = 0; i < 1000; i++) {
    insertString = '';
    for (let j = 0; j < 1000; j++) {
      i1 = imagesArray[Math.floor(Math.random()*334)][1];
      prodId += 1;
      insertString += `${prodId},${i1},${prodId}\n`
    }
    fs.appendFile('photos.csv',insertString, (err, res) => {
      if (err) {
        console.log(err);
      } 
    });
  }

  console.log('success');
  res.end();

})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
});

//old seed function, approximately 5:40
/*
app.post('/seed', (req, res) => {
  let i1 = '';
  let insertString = '';
  const imagesArray = imageArray.imageArray

  for (let i = 0; i < 1000; i++) {
    insertString = '';
    for (let j = 0; j < 1000; j++) {
      i1 = imagesArray[Math.floor(Math.random()*334)][1];
      prodId += 1;
      if (j === 999) {
        insertString += `('${i1}',${prodId});`
      } else {
        insertString += `('${i1}',${prodId}),`
      }
    }
    db.seed(insertString, (err, result) => {
      if (err) {
        console.log(err);
        res.end()
      }
    });
  }

  console.log('success');
  res.end();

})
*/





