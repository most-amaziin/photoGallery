import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gallery from '../presentational/gallery';

export default class View extends React.Component {
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
          <tr>
            <td id="gallery" class='gallery'>
              < Gallery />
            </td>
            <td id="full" class='view'>
              <p>I'm a View woo hoo cachoo</p>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}