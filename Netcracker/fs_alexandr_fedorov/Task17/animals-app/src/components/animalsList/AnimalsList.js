import './AnimalsList.css'
import AnimalCard from '../animalCard/AnimalCard';
import {useState} from "react";

function AnimalsList(props) {

  const [state, setState] = useState({
    hide: false,
    buttonText: 'Hide Cats'
  });

  function hideCats() {
    if (!state.hide) {
      setState({
        hide: !state.hide,
        buttonText: 'Show Cats'
      })
    } else {
      setState({
        hide: !state.hide,
        buttonText: 'Hide Cats'
      })
    }
  }

  return (
      <div className={'list'}>
        {
          props.animals.map(animal => {
            if(animal.type === 'Cat' && state.hide === true) return null
            return <AnimalCard animal={animal}/>
          })
        }
        <button className={'list__btn'} onClick={hideCats}>{state.buttonText}</button>
      </div>
  );
}

export default AnimalsList;