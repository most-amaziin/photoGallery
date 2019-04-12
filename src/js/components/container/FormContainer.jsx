import React from "react";
import axios from "axios";
import Gallery from "../presentational/gallery";
import View from "../presentational/view";

const URL = `http://ec2-52-15-195-39.us-east-2.compute.amazonaws.com`;

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      productId: 13,
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

  componentDidMount() {
    console.log("1ZZZ");
    window.addEventListener("updateProdId", this.handleUpdateProdId.bind(this));
    const currentPhoto = this.state.photo.id;
    const currentProduct = this.state.productName;
    this.getProductPics();
    this.getProductName();
  }

  handleUpdateProdId(event) {
    console.log("event.detail ", event);
    if (event.detail) {
      const newProductId = event.detail;
      this.setState({ productId: newProductId });
      this.getProductPics(newProductId);
      this.getProductName(newProductId);
    }
  }

  getProductPics(productId = this.state.productId) {
    // axios.get(`${host}:3000/api/reviews`, { headers: { productid: id, 'Access-Control-Allow-Origin': `${host}:3000/api/reviews` } })

    console.log("URL :", URL);
    axios
      .get(`${URL}/photos`, {
        headers: { "Access-Control-Allow-Origin": `${URL}/photos` },
        params: { id: productId }
      })
      .then(results => {
        this.setState(
          { productPhotos: results.data, photo: results.data[0] },
          () => {
            console.log("6ZZZ");
          }
        );
      })
      .catch("Could not load product photos at client gallery");
  }

  getProductName(productId = this.state.productId) {
    axios
      .get(`${URL}/product/id`, {
        headers: { "Access-Control-Allow-Origin": `${URL}/product/id` },
        params: { id: productId }
      })
      .then(result => {
        console.log("6yyy", result.data);
        this.setState({ productName: result.data[0].name });
      })
      .catch("Could not load chosen photo at client view");
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
                toggleFullScreen={this.toggleFullScreen}
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
          <div id="full" class="view">
            <View
              photo={this.state.photo}
              productPhotos={this.state.productPhotos}
              productName={this.state.productName}
              fullScreen={this.state.fullScreen}
              toggleFullScreen={this.toggleFullScreen}
            />
          </div>
          <table>
            <tr id="gallery" class="galleryHorizontal">
              <Gallery
                clickPhoto={this.handleClick}
                productPhotos={this.state.productPhotos}
                productName={this.state.productName}
                fullScreen={this.state.fullScreen}
                toggleFullScreen={this.toggleFullScreen}
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
