Mongo: mongoimport --db photogallery --collection photos --type csv < /home/andersaustin/Documents/HR_Github_Repos/SDC/photoGallery/photos.csv --headerline

Mongo: db.photos.createIndex({product_id:'hashed'})

Postgres: Copy photos from '/home/andersaustin/Documents/HR_Github_Repos/SDC/photoGallery/photos.csv' with (format csv);