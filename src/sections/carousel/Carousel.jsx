import './Carousel.css'
import Card from '../../components/card/Card'
import { useResize } from '../../hooks/hooks'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { pages } from '../../utils/Constants';
import { getPageFromType } from '../../utils/Helper';

const sampleData = [];
for(let i=0; i<10; i++) {
  sampleData.push({key: i, src:'', name: 'Loading...', desc: 'Loading...', type: ''})
}

export default function Carousel({title, parentRef, data, hideShowAll, id}) {
  const navigate = useNavigate();

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

  const onClickShowAll = (id) => {
    navigate({
      pathname: pages.category,
      search: createSearchParams({
        id: id,
      }).toString()
    })
  }

  const onClickCard = (id, type) => {
    navigate({
      pathname: getPageFromType(type),
      search: createSearchParams({
        id: id,
      }).toString()
    })
  }

  return (
    <div className='carousel'>
        <div className="carousel-head">
          <div className='carousel-title'>{title}</div>
          { !hideShowAll && <div onClick={() => onClickShowAll(id)} className="carousel-show-all">Show all</div> }
        </div>
        <div className="carousel-items">
            {
              cards.map((card) => {
                return <Card onClick={() => onClickCard(card.key, card.type)} key={card.key} src={card.src} name={card.name} desc={card.desc}/>
              })
            }
        </div>
    </div>
  )
}
