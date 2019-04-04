import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class View extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <img id='view' src={this.props.photo.url} alt={`photo ${this.props.photo.id} for product ${this.props.photo.product_id}`}></img>
      </div>
    )
  }
}