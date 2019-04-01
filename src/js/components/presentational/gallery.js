import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.src);
  }

  render() {
    let tempArr = [
      "https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg",
      "https://s3.amazonaws.com/fecphotogallery2019/photos/1_2.jpg",
      "https://s3.amazonaws.com/fecphotogallery2019/photos/4_1.jpg"];
    const productPhotos = tempArr.map((photo) =>
      <div>
        {/* <p>{photo}</p> */}
        <img src={photo} class='photo' value={photo} onClick={this.handleClick} />
      </div>
    );
    return (
      <div>I am a picture gallery yay
        {productPhotos}
        {/* <img src="https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg">temp image</img> */}
      </div>
    )
  }
}