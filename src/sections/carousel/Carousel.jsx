import './Carousel.css'
import Card from '../../components/card/Card'
import { useResize } from '../../hooks/hooks'

const sampleData = [];
for(let i=0; i<10; i++) {
  sampleData.push({key: i, src:'', name: 'Loading...', desc: 'Loading...'})
}

export default function Carousel({title, parentRef, data}) {

  if( title === undefined || title === null ) {
    title = 'Title Loading...'
  }

  if(data === undefined || data === null) {
    data = sampleData;
  }

  const widthState = useResize(parentRef, [1300, 1150, 1000, 770, 560]);
  let cards = [data];

  let numOfItems = 0;
  switch(widthState) {
    case 0 :
      numOfItems = 2;
      break;
    case 1:
      numOfItems = 3;
      break;
    case 2:
      numOfItems = 4;
      break;
    case 3:
      numOfItems = 5;
      break;
    case 4:
      numOfItems = 6;
      break;
    default:
      numOfItems = 7;
  }

  if(data.length >= numOfItems) {
    cards = data.slice(0, numOfItems);
  }
  
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
