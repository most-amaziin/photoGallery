import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const photos = this.props.productPhotos.map((photo) => (
      <tr class='photosContainer'>
        <span class='photoSpan'></span>
        <img class='photos' onClick={this.props.clickPhoto} id={photo.id} src={photo.url} alt={`photo ${photo.id} for product ${photo.product_id}`}></img>
      </tr >
    ));
    return (
      <table>
        {photos}
      </table>
    )
  }
}