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

  const zoomView = (
    <div>
      <div id="zoomView" class="photo-zoom-result" />
    </div>
  );

  const fullScreenPhoto = (
    <div class="fullScreenContainer">
      <img
        onClick={props.toggleFullScreen}
        class="fullScreen"
        src={props.photo.url}
        alt={`photo ${props.photo.id} for product ${props.photo.product_id}: 
        ${props.productName}`}
      />
      <div class="previous" onClick={props.clickCarousel}>
        {"<"}
      </div>
      <div class="next" onClick={props.clickCarousel}>
        {">"}
      </div>
    </div>
  );

  console.log("all duh photos ", props.productPhotos);

  const carousalSlides = props.productPhotos.map(photo => {
    if (photo.url !== props.photo.url) {
      return (
        <div class="carousel-item">
          <img
            class="d-block w-100"
            onClick={props.toggleFullScreen}
            id={photo.id}
            src={photo.url}
            alt={`photo ${photo.id} for product ${photo.product_id}: 
            ${props.productName}`}
          />
        </div>
      );
    }
  });

  const carouselView = (
    <div
      id="carousel-thumb"
      class="carousel slide carousel-fade carousel-thumbnails"
      data-ride="carousel"
    >
      {/* <!--Slides--> */}
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg"
            alt="First slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(121).jpg"
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg"
            alt="Third slide"
          />
        </div>
      </div>
      {/* <!--/.Slides-->
  <!--Controls--> */}
      <a
        class="carousel-control-prev"
        href="#carousel-thumb"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carousel-thumb"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="sr-only">Next</span>
      </a>
      {/* <!--/.Controls--> */}
      <ol class="carousel-indicators">
        <li data-target="#carousel-thumb" data-slide-to="0" class="active">
          {" "}
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(88).jpg"
            class="img-fluid"
          />
        </li>
        <li data-target="#carousel-thumb" data-slide-to="1">
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(121).jpg"
            class="img-fluid"
          />
        </li>
        <li data-target="#carousel-thumb" data-slide-to="2">
          <img
            class="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(31).jpg"
            class="img-fluid"
          />
        </li>
      </ol>
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
          <img
            class="d-block w-100"
            onClick={props.toggleFullScreen}
            id={props.photo.id}
            src={props.photo.url}
            alt="First slide"
          />
        </div>
        {carousalSlides}
        {/* <div class="carousel-item">
          <img
            class="d-block w-100"
            onClick={props.toggleFullScreen}
            src={props.photo.url}
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            onClick={props.toggleFullScreen}
            src={props.photo.url}
            alt="Third slide"
          />
        </div> */}
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
