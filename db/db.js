//AWS S3 bucket: fecphotogallery2019
//'https://s3.amazonaws.com/fecphotogallery2019/photos/'

const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

client.connect((err) => {
  if (err) {
    console.log('error connecting to client at DB :', err);
  } else {
    console.log('connected to server at DB')
  }
})

// user clicks a product, send back all product photos object
const getProductPics = (productId, cb) => {
  console.log('3ZZZ', productId)
  client.query(`SELECT * FROM photos WHERE product_id = ${productId}`, (err, results) => {
    if (err) {
      console.log('could not load pictures for product id :', productId, ' error:', err);
      cb(err);
    } else {
      console.log('4ZZZ', results.rows)
      cb(null, results.rows);
    }
  });
};

// user clicks a photo, send back one photo object
const getViewPic = (photoId, cb) => {
  client.query(`SELECT url FROM photos WHERE id = ${photoId}`, (err, result) => {
    if (err) {
      console.log('could not load picture by id :', photoId, ' error:', err);
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

let policyAWS = {
  "Id": "Policy1553802725184",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1553802718887",
      "Action": [
        "s3:GetBucketAcl",
        "s3:GetBucketCORS",
        "s3:GetBucketLocation",
        "s3:GetBucketLogging",
        "s3:GetBucketNotification",
        "s3:GetBucketPolicy",
        "s3:GetBucketPolicyStatus",
        "s3:GetBucketPublicAccessBlock",
        "s3:GetBucketRequestPayment",
        "s3:GetBucketTagging",
        "s3:GetBucketVersioning",
        "s3:GetBucketWebsite",
        "s3:GetEncryptionConfiguration",
        "s3:GetInventoryConfiguration",
        "s3:GetLifecycleConfiguration",
        "s3:GetMetricsConfiguration",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectTagging",
        "s3:GetObjectTorrent",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl",
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionTagging",
        "s3:GetObjectVersionTorrent",
        "s3:GetReplicationConfiguration"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::fecphotogallery2019",
      "Principal": {
        "AWS": [
          "\"Principal\": \"*\""
        ]
      }
    }
  ]
}

module.exports = { getProductPics, getViewPic }