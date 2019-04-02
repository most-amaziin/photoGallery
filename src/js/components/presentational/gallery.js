import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      productPhotos: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('1ZZZ')
    axios.get('/photos', { params: { id: this.state.productId } })
      .then(results => {
        this.setState({ productPhotos: results.data }, () => {
          console.log('6ZZZ')
        })
      })
      .catch('Could not load product photos at client gallery')
  }

  handleClick(e) {
    // console.log(e.target);
    // console.log(e.target.value);
    // console.log(e.target.src);
  }

  render() {
    const tempArr = [
      "https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg",
      "https://s3.amazonaws.com/fecphotogallery2019/photos/1_2.jpg",
      "https://s3.amazonaws.com/fecphotogallery2019/photos/4_1.jpg"];
    const photos = this.state.productPhotos.map((url) => (
      <div class='photo'>
        <p>{url.id}</p>
        <p>{url.url}</p>
        <p>{url.product_id}</p>
        {/* <img src={photo} class='photo1' value={photo} onClick={this.handleClick} /> */}
      </div>
    ));
    return (
      <div>
        {photos}
      </div>
    )
  }
}