import './Carousel.css'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'

const sampleData = [];
for(let i=0; i<10; i++) {
  sampleData.push({key: i, src:'', name: 'Loading...', desc: 'Loading...'})
}

export default function Carousel({title, parentRef, data}) {

  if( title === undefined || title === null ) {
    title = 'Title Loading...'
  }

  const [cards, setCards] = useState([]);

  useEffect(() => {

    let dataToUse = [];
    if(data === undefined || data === null) {
      dataToUse = sampleData;
    }else {
      dataToUse = data;
    }

    const observer = new ResizeObserver((entries) => {
      const parentWidth = entries[0].contentRect.width;
      let numOfItems = 7;

      if( parentWidth < 1300 && dataToUse.length >= 6 ) {
        numOfItems = 6;
      }

      if( parentWidth < 1150 && dataToUse.length >= 5 ) {
        numOfItems = 5;
      }

      if(parentWidth < 1000 && dataToUse.length >= 4) {
        numOfItems = 4;
      }

      if( parentWidth < 770 && dataToUse.length >= 3 ) {
        numOfItems = 3;
      }

      if( parentWidth < 560 && dataToUse.length >= 2 ) {
        numOfItems = 2;
      }

      setCards(() => {
        return dataToUse.slice(0, numOfItems);
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
          <div className="carousel-show-all">Show all</div>
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
