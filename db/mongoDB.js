const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photogallery');

let photoSchema = mongoose.Schema({
  photoId: Number,
  url: String,
  product_id: Number
});

let Photos = mongoose.model('Photos', photoSchema);

let save = (url, product_id, cb) => {
  Photos.find({},['photoId'],{
    skip: 0,
    limit: 1,
    sort: {
      _id:-1
    }
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newId = data[0].photoId+1;
      let newThing  = new Photos({
          photoId: newId,
          url: url,
          product_id: product_id
      })
       
      newThing.save((err, success) => {
        if (err) {
          console.log('err')
          cb(err);
        } else {
          cb(null,success)
        }
      })
    }
  });

}

let update = (url, product_id, cb) => {
      let newId = 10000000
      let randomId = Math.floor(Math.random()*newId);
      Photos.findOneAndUpdate({photoId: randomId},{url: url, product_id: product_id}, (err, data) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          cb(null, data);
        }
      })
};

const deleteOne = (cb) => {
  Photos.find({},['photoId'],{
    skip: 0,
    limit: 1,
    sort: {
      _id:-1
    }
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newId = data[0].photoId;
      let randomId = Math.floor(Math.random()*newId);
      Photos.deleteOne({photoId: randomId}, (err, data) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          cb(null, data);
        }
      })
    }
  });
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

module.exports.update = update;

module.exports.Delete = deleteOne;



