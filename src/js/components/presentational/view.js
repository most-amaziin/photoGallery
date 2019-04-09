import React from "react";

const View = props => {
  const mainView = (
    <div>
      <p>{props.fullScreen}</p>
      <img
        id="view"
        class="photo"
        src={props.photo.url}
        onClick={props.toggleFullScreen}
        alt={`photo ${props.photo.id} for product 
      ${props.photo.product_id}: ${props.productName}`}
      />
    </div>
  );
  const carousalView = (
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src={props.photo.url} alt="First slide" />
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src={props.photo.url} alt="Second slide" />
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src={props.photo.url} alt="Third slide" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="sr-only">Next</span>
      </a>
    </div>
  );

  if (props.fullScreen === false) {
    return <div>{mainView}</div>;
  } else {
    return <div>{carousalView}</div>;
  }
};

export default View;
