import React from "react";

// console.log("TEST :", photo.id, props.photoId);

const Gallery = props => {
  let textOnFourthThumbnail = "";
  if (props.productPhotos.length > 3) {
    textOnFourthThumbnail = `+ ${props.productPhotos.length - 3} more`;
  }
  const photosVertical = props.productPhotos.map(photo => {
    if (
      props.productPhotos[0].id === photo.id ||
      props.productPhotos[1].id === photo.id ||
      props.productPhotos[2].id === photo.id
    ) {
      return (
        <tr class="photosContainer">
          <div
            className={
              photo.id == props.photo.id ? "selectedThumbnail" : "thumbnail"
            }
          >
            <img
              class="photosVertical"
              onClick={props.clickPhoto}
              id={photo.id}
              src={photo.url}
              alt={`photo ${photo.id} for product ${photo.product_id}: 
              ${props.productName}`}
            />
          </div>
        </tr>
      );
    } else if (props.productPhotos[3].id === photo.id) {
      return (
        <tr class="photosContainerFourth" onClick={props.toggleFullScreen}>
          <div className="fourthThumbnail">
            <img
              class="photosVerticalFourth"
              id={photo.id}
              src={photo.url}
              alt={`photo ${photo.id} for product ${photo.product_id}: 
              ${props.productName}`}
            />
            <div class="fourthThumbnailText">{textOnFourthThumbnail}</div>
          </div>
        </tr>
      );
    }
  });

  const photosHorizontal = props.productPhotos.map(photo => (
    <td class="photosContainer">
      <div
        className={
          photo.id == props.photo.id ? "selectedThumbnail" : "thumbnail"
        }
      >
        <img
          class={"photosHorizontal"}
          onClick={props.clickPhoto}
          id={photo.id}
          src={photo.url}
          alt={`photo ${photo.id} for product ${photo.product_id}: 
        ${props.productName}`}
        />
      </div>
    </td>
  ));

  if (props.fullScreen === false) {
    return <table>{photosVertical}</table>;
  } else {
    return <table>{photosHorizontal}</table>;
  }
};

export default Gallery;
