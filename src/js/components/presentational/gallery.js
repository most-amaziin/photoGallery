import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Gallery = (props) => {
  const photos = props.productPhotos.map((photo) => (
    <tr class='photosContainer'>
      <span class='photoSpan'></span>
      <img class='photos' onClick={props.clickPhoto} id={photo.id} src={photo.url} alt={`photo ${photo.id} for product ${photo.product_id}: ${props.productName}`}></img>
    </tr >
  ));
  return (
    <table>
      {photos}
    </table>
  )
}

export default Gallery