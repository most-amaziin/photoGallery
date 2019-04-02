import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gallery from '../presentational/gallery';
import View from '../presentational/view';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e.target.value);

  }

  render() {

    return (
      <div>
        <table>
          <td id="gallery" class='gallery'>Gallery
            <Gallery />
          </td>
          <td id="full" class='view'>View
            <View />
          </td>
        </table>
      </div>
    )
  }
}