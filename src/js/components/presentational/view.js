import React from 'react';

const View = (props) => {

  return (
    <div>
      <img id='view' src={props.photo.url} alt={`photo ${props.photo.id} for product ${props.photo.product_id}: ${props.productName}`}></img>
    </div>
  )
}

export default View