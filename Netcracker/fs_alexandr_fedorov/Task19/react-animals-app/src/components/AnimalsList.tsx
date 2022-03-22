import './AnimalsList.css'
import React, {useState} from "react";
import {AnimalCard} from "./AnimalCard";
import {Animal} from "../models/animal";

interface AnimalListProps{
  animals: Animal[];
}

export const AnimalsList: React.FC<AnimalListProps> = (props) => {
  const [state, setState] = useState({
    hide: false,
    buttonText: 'Hide Cats'
  });
  function hideCats() {
    console.log('cats')
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
        props.animals.map((animal: Animal) => {
          if(animal.type === 'Cat' && state.hide) return null
          return <AnimalCard animal={animal} key={animal.id.toString()}/>
        })
      }
      <button className={'list__btn'} onClick={hideCats}>{state.buttonText}</button>
    </div>
  );
}
