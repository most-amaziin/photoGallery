const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photogallery');

let photoSchema = mongoose.Schema({
  photoId: Number,
  url: String,
  product_id: Number
});

let Photos = mongoose.model('Photos', photoSchema);

let save = (Id,url, product_id) => {
  let newThing  = new Photos({
      photoId: Id,
      url: url,
      product_id: product_id
  })
   
  newThing.save((err, success) => {
    if (err) {
      console.log('err')
    } else {
      console.log('success');
    }
  })
}

// user clicks a product, send back all product photos object
const getProductPics = (productId, callback) => {
    Photos.find({'product_id': productId},['photoId','url','product_id'],
    {
      skip: 0,
      // limit: 25,
      sort: {
        _id: -1
      }
    }, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null,data);
      }
    });
  };

  const getProductName = (productId, callback) => {
      Photos.find({'product_id': productId}, ['photoId', 'url', 'product_id'],
      {
        skip: 0,
        // limit: 25,
        sort: {
        _id: -1  
        }
      }, (err, data) => {
          if (err) {
              callback(err);
          } else {
              cb(null,data);
          }
      });
  };

let getAll = (callback) => {
  Photos.find({},['photoId','url','product_id'],
  {
    skip: 0,
    // limit: 25,
    sort: {
      _id: -1
    }
  }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null,data);
    }
  });
}

module.exports.save = save;

module.exports.getAll = getAll;

module.exports.getProductPics = getProductPics;

module.exports.getProductName = getProductName;




