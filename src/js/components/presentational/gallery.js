import React from "react";

const Gallery = props => {
  const photosVertical = props.productPhotos.map(photo => (
    <tr class="photosContainer">
      <div class="photosBox">
        <img
          class="photos"
          onClick={props.clickPhoto}
          id={photo.id}
          src={photo.url}
          alt={`photo ${photo.id} for product ${photo.product_id}: 
        ${props.productName}`}
        />
      </div>
    </tr>
  ));
  const photosHorizontal = props.productPhotos.map(photo => (
    <td class="photosContainer">
      {/* <span class="photoSpan" /> */}
      <img
        class="photos"
        onClick={props.clickCarousel}
        id={photo.id}
        src={photo.url}
        alt={`photo ${photo.id} for product ${photo.product_id}: 
        ${props.productName}`}
      />
    </td>
  ));

  if (props.fullScreen === false) {
    return <table>{photosVertical}</table>;
  } else {
    return <table>{photosHorizontal}</table>;
  }
};

export default Gallery;
