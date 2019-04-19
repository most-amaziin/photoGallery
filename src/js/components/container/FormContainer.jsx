import React from "react";
import axios from "axios";
import Gallery from "../presentational/gallery.js";
import View from "../presentational/view.js";

const URL = `http://localhost:3005`;

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      productId: 1,
      productPhotos: [],
      productName: "product photo",
      photo: {
        id: 1,
        url: "https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg",
        product_id: 1
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.clickCarousel = this.clickCarousel.bind(this);
  }

  componentDidMount() {
    window.addEventListener("updateProdId", this.handleUpdateProdId.bind(this));
    const currentPhoto = this.state.photo.id;
    const currentProduct = this.state.productName;
    this.getProductPics();
    // this.getProductName();
  }

  handleUpdateProdId(event) {
    e.preventDefault();
    if (event.detail) {
      const newProductId = event.detail;
      this.setState({ productId: newProductId });
      // this.getProductPics(newProductId);
      // this.getProductName(newProductId);
    }
  }

  getProductPics(productId = this.state.productId) {
    console.log(productId);
    axios
      .get(`${URL}/photos`, {
        headers: { "Access-Control-Allow-Origin": `${URL}/photos` },
        params: { id: productId }
      })
      .then(results => {
        console.log(results)
        for (let val of results.data) {
          val.url = val.url.slice(1,-1)
        }
        this.setState(
          { productPhotos: results.data, photo: results.data[0] });
      })
      .catch("Could not load product photos at client gallery");
  }

  // getProductName(productId = this.state.productId) {
  //   axios
  //     .get(`${URL}/product/id`, {
  //       headers: { "Access-Control-Allow-Origin": `${URL}/product/id` },
  //       params: { id: productId }
  //     })
  //     .then(result => {
  //       this.setState({ productName: result.data[0].name });
  //     })
  //     .catch("Could not load chosen photo at client view");
  // }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      photo: {
        id: e.target.id,
        url: e.target.src
      }
    });
  }

  clickCarousel(e) {
    e.preventDefault();
    let currentPhotoId = this.state.photo.id;
    let photosArray = this.state.productPhotos;
    let prevPhoto = this.state.photo;
    let nextPhoto = this.state.photo;

    if (photosArray.length > 1) {
      for (let i = 0; i < photosArray.length; i++) {
        if (photosArray[i].id === Number(currentPhotoId)) {
          if (photosArray[i - 1]) prevPhoto = photosArray[i - 1];
          else prevPhoto = photosArray[photosArray.length - 1];
          if (photosArray[i + 1]) nextPhoto = photosArray[i + 1];
          else nextPhoto = photosArray[0];
        }
      }
    }

    if (
      e.target.className === "previous arrowbutton" ||
      e.target.className === "previousArrow"
    ) {
      this.setState({ photo: prevPhoto });
    } else if (
      e.target.className === "next arrowbutton" ||
      e.target.className === "nextArrow"
    ) {
      this.setState({ photo: nextPhoto });
    }
  }

  toggleFullScreen(e) {
    e.preventDefault();
    if (this.state.fullScreen === false) this.setState({ fullScreen: true });
    else this.setState({ fullScreen: false });
  }

  render() {
    if (this.state.fullScreen === false) {
      return (
        <div>
          <table class="verticalContainer">
            <td id="gallery" class="galleryVertical">
              <Gallery
                handleClick={this.handleClick}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                toggleFullScreen={this.toggleFullScreen}
                photo={this.state.photo}
              />
            </td>
            <td id="full" class="photoVertical">
              <View
                photo={this.state.photo}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                toggleFullScreen={this.toggleFullScreen}
              />
            </td>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <div id="full" class="view">
            <View
              photo={this.state.photo}
              productPhotos={this.state.productPhotos}
              productName={this.state.productName}
              fullScreen={this.state.fullScreen}
              toggleFullScreen={this.toggleFullScreen}
              clickCarousel={this.clickCarousel}
            />
          </div>
          <table class="galleryHorizontalContainer">
            <tr id="gallery" class="galleryHorizontal">
              <Gallery
                handleClick={this.handleClick}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                toggleFullScreen={this.toggleFullScreen}
                photo={this.state.photo}
              />
            </tr>
          </table>
        </div>
      );
    }
  }
}
