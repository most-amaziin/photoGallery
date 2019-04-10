import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Gallery from "../presentational/gallery";
import View from "../presentational/view";

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      productId: 12,
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
    // this.clickCarousel = this.clickCarousel.bind(this);
  }

  handleUpdateProdId(event) {
    console.log("event.detail ", event);
    if (event.detail) this.setState({ productId: event.detail });
    //UPDATE GET/POST REQUESTS
  }

  componentDidMount() {
    console.log("1ZZZ");
    //NEED TO TEST THIS
    window.addEventListener("updateProdId", this.handleUpdateProdId.bind(this));
    // window.addEventListener(
    //   "updateProdId",
    //   this.setState({ productId: event.detail })
    // );
    const currentPhoto = this.state.photo.id;
    const currentProduct = this.state.productName;
    axios
      .get("/photos", { params: { id: this.state.productId } })
      .then(results => {
        this.setState(
          { productPhotos: results.data, photo: results.data[0] },
          () => {
            console.log("6ZZZ");
          }
        );
      })
      .catch("Could not load product photos at client gallery")
      .then(
        axios
          .get("/product/id", { params: { id: this.state.productId } })
          .then(result => {
            console.log("6yyy", result.data);
            this.setState({ productName: result.data[0].name });
          })
          .catch("Could not load chosen photo at client view")
      );
  }

  handleClick(e) {
    this.setState({
      photo: {
        id: e.target.id,
        url: e.target.src,
        //THIS WILL UPDATE WHEN CONNECTING TO OTHER COMPONENTS
        product_id: this.state.productId
      }
    });
  }

  clickCarousel(e) {
    document.getElementsByClassName("carousel-item active").className =
      "carousel-item";
    e.target.parent().className = "carousel-item-active";
    // <div class="carousel-inner">
    //     <div class="carousel-item active"></div>
  }

  toggleFullScreen(e) {
    console.log("FS toggle :", this.state.fullScreen);
    if (this.state.fullScreen === false) this.setState({ fullScreen: true });
    else this.setState({ fullScreen: false });
  }

  render() {
    if (this.state.fullScreen === false) {
      return (
        <div>
          <table>
            <td id="gallery" class="galleryVertical">
              <Gallery
                clickPhoto={this.handleClick}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                photo={this.state.photo}
              />
            </td>
            <td id="full" class="view">
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
          <table>
            <tr id="full" class="view">
              <View
                photo={this.state.photo}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                toggleFullScreen={this.toggleFullScreen}
              />
            </tr>
            <tr id="gallery" class="galleryHorizontal">
              <Gallery
                clickPhoto={this.handleClick}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                clickCarousel={this.clickCarousel}
                photo={this.state.photo}
              />
            </tr>
          </table>
        </div>
      );
    }
  }
}
