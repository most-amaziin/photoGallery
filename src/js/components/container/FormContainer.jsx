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
      productId: 96,
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
  }

  componentDidMount() {
    console.log("1ZZZ");
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

  toggleFullScreen(e) {
    console.log("FS toggle :", this.state.fullScreen);
    if (this.state.fullScreen === false) this.setState({ fullScreen: true });
    else this.setState({ fullScreen: false });
  }

  render() {
    return (
      <div>
        <table>
          <td id="gallery" class="gallery">
            <Gallery
              clickPhoto={this.handleClick}
              productPhotos={this.state.productPhotos}
              productName={this.state.productName}
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
  }
}
