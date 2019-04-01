const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('../db/db');

const photoGalleryPath = '/Users/partypeoplegames/13 weeks/FEC/photoGallery/client';
app.use(bodyParser.json({ urlencoded: false }));
app.use(express.static('dist'));

//user clicks a product, request all product photos
app.get('/photos', (req, res) => {
  const productId = req.query.id;
  db.getProductPics(productId, (error, results) => {
    if (error) {
      console.log('server failed to load photos ', error);
      res.end();
    } else {
      res.status(200).send(results);
    }
  })
  res.end(res.body);
});

//user clicks a photo, request one photo from DB
app.get('/photos/id', (req, res) => {
  const photoId = req.query.id;
  db.getViewPic(photoId, (error, result) => {
    if (error) {
      console.log('server failed to get photo ', error)
      res.end();
    } else {
      res.status(200).send(result);
    }
  })
});

const PORT = 3210;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})