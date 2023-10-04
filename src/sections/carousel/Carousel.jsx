import './Carousel.css'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'

export default function Carousel({title, parentRef, data}) {

  const [cards, setCards] = useState([]);

  useEffect(() => {

    const observer = new ResizeObserver((entries) => {
      const parentWidth = entries[0].contentRect.width;
      let numOfItems = 7;
      console.log(entries[0]);

      if( parentWidth < 1300 && data.length >= 6 ) {
        numOfItems = 6;
      }

      if( parentWidth < 1150 && data.length >= 5 ) {
        numOfItems = 5;
      }

      if(parentWidth < 1000 && data.length >= 4) {
        numOfItems = 4;
      }

      if( parentWidth < 770 && data.length >= 3 ) {
        numOfItems = 3;
      }

      if( parentWidth < 560 && data.length >= 2 ) {
        numOfItems = 2;
      }

      setCards(() => {
        return data.slice(0, numOfItems);
      })

    });

    observer.observe(parentRef.current);

    return () => {
      observer.disconnect();
    }

  }, [parentRef, data]);

  return (
    <div className='carousel'>
        <div className="carousel-head">
          <div className='carousel-title'>{title}</div>
          {data.length > 7 && <div className="carousel-show-all">Show all</div> }
        </div>
        <div className="carousel-items">
            {
              cards.map((card) => {
                return <Card key={card.key} src={card.src} name={card.name} desc={card.desc}/>
              })
            }
        </div>
    </div>
  )
}
