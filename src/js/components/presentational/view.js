import React from "react";

const View = props => {
  const mainView = (
    <div class="photo-container">
      <img
        class="photo"
        id="view"
        src={props.photo.url}
        onClick={props.toggleFullScreen}
        alt={`photo ${props.photo.id} for product 
      ${props.photo.product_id}: ${props.productName}`}
      />
    </div>
  );

  const fullScreenPhoto = (
    <div class="fullScreenContainer">
      {/* <div class="closeFullScreen" onClick={props.toggleFullScreen}>
        <span class="fullScreenX" onClick={props.toggleFullScreen}>
          X
        </span>
      </div> */}
      <img
        onClick={props.toggleFullScreen}
        class="fullScreen"
        src={props.photo.url}
        alt={`photo ${props.photo.id} for product ${props.photo.product_id}: 
        ${props.productName}`}
      />
      <div class="previous arrowbutton" onClick={props.clickCarousel}>
        <span class="previousArrow" onClick={props.clickCarousel}>
          &#8249;
        </span>
      </div>
      <div class="next arrowbutton" onClick={props.clickCarousel}>
        <span class="nextArrow" onClick={props.clickCarousel}>
          &#8250;
        </span>
      </div>
    </div>
  );

  if (props.fullScreen === false) {
    return (
      <div>
        {mainView}
        {/* {zoomView} */}
      </div>
    );
  } else {
    return <div>{fullScreenPhoto}</div>;
  }
};

export default View;
