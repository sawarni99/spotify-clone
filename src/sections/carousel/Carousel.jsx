import './Carousel.css'
import React from 'react'
import Card from '../../components/card/Card'

export default function Carousel({title}) {
  return (
    <div className='carousel'>
        <div className='carousel-title'>
            {title}
        </div>
        <div className="carousel-items">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}
