import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gallery from '../presentational/gallery';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // console.log(e.target.value);
    // let productPhotos = '';
    // let tempArr = ["https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg",
    //   "https://s3.amazonaws.com/fecphotogallery2019/photos/1_2.jpg",
    //   "https://s3.amazonaws.com/fecphotogallery2019/photos/4_1.jpg"];
    // for (let i = 0; i < tempArr.length; i++) {
    //   productPhotos += <img src={tempArr[i]} />;
    // }
  }

  render() {
    return (
      <div>
        <table>
          <td id="gallery">
            {/* {productPhotos} */}

          </td>
          <td id="full">

          </td>

        </table>
        <p>I'm a View</p>
        < Gallery />
      </div>
    )
  }
}

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;