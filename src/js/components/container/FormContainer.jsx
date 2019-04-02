import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gallery from '../presentational/gallery';
import View from '../presentational/view';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      productPhotos: [],
      photo: {
        id: 1,
        url: 'https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg',
        product_id: 1
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('1ZZZ')
    const currentPhoto = this.state.photo.id;
    axios.get('/photos/id', { params: { id: currentPhoto } })
      .then(results => {
        this.setState({ photo: results.data[0] })
      })
      .catch('Could not load chosen photo at client view')
      .then(axios.get('/photos', { params: { id: this.state.productId } })
        .then(results => {
          this.setState({ productPhotos: results.data }, () => {
            console.log('6ZZZ')
          })
        })
        .catch('Could not load product photos at client gallery')
      )
  }

  handleClick(e) {
    this.setState({
      photo: {
        id: e.target.id,
        url: e.target.src,
        //THIS WILL UPDATE WHEN CONNECTING TO OTHER COMPONENTS
        product_id: this.state.productId
      }
    })
  }

  render() {

    return (
      <div>
        <table>
          <td id="gallery" class='gallery'>
            <Gallery clickPhoto={this.handleClick} productPhotos={this.state.productPhotos} />
          </td>
          <td id="full" class='view'>
            <View photo={this.state.photo} />
          </td>
        </table>
      </div>
    )
  }
}