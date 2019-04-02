import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoId: 1,
      photoURL: 'https://s3.amazonaws.com/fecphotogallery2019/photos/1_1.jpg'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios.get('/photos/id', { params: { id: this.state.photoId } })
      .then(results => {
        this.setState({ photoURL: results.data[0].url })
      })
      .catch('Could not load chosen photo at client view')
  }

  handleClick(e) {
    // console.log(e.target.value);

  }

  render() {

    return (
      <div>
        <p>{this.state.photoURL}</p>
      </div>
    )
  }
}