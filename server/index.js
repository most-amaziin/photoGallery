// const express = require('express')
// const app = express()
// app.use(express.static('dist'))
// app.listen(3000, () => console.log('Server running on port 3000'))

const express = require("express");
const app = express();
// require('dotenv').config();
require("dotenv").config({ path: __dirname + "/../.env" });

const bodyParser = require("body-parser");
const db = require("../db/db");

const photoGalleryPath =
  "/Users/partypeoplegames/13 weeks/FEC/photoGallery/client";
app.use(bodyParser.json({ urlencoded: false }));
app.use(express.static("dist"));

//user clicks a product, request all product photos
app.get("/photos", (req, res) => {
  const productId = req.query.id;
  console.log("2ZZZ :", productId);
  db.getProductPics(productId, (error, results) => {
    if (error) {
      console.log("server failed to load photos ", error);
      res.end();
    } else {
      console.log("5ZZZ", results);
      res.send(results);
    }
  });
});

//user clicks a photo, request one photo from DB
app.get("/photos/id", (req, res) => {
  const photoId = req.query.id;
  db.getViewPic(photoId, (error, result) => {
    if (error) {
      console.log("server failed to get photo ", error);
      res.end();
    } else {
      res.send(result);
    }
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
