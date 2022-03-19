import React from 'react'
import { Card } from 'react-bootstrap';
import './ProductCard.css'
// import product from '../../../assets/images/products/studytable.jpeg'


const ProductCard = (props) => {
  return (
    <Card className='card'>
        <div className='image-container'>
            <Card.Img variant="top" src={props.product.image} />
        </div>       
        <Card.Body>
            <Card.Title>{props.product.title}</Card.Title>
            <Card.Text>
            &#x20B9;{props.product.price}
            </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default ProductCard