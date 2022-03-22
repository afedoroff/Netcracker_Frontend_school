import './AnimalCard.css';
import {useState} from "react";
import {Cat} from '../../assets/Cat'
import {Dog} from '../../assets/Dog'
import {Rabbit} from '../../assets/Rabbit'
import {Turtle} from '../../assets/Turtle'
import {Octopus} from '../../assets/Octopus'
import {Pig} from '../../assets/Pig'

const ImgComponents = {
  Cat: Cat,
  Dog: Dog,
  Rabbit: Rabbit,
  Turtle: Turtle,
  Octopus: Octopus,
  Pig: Pig
}

function AnimalCard(props) {
  const [clicked, setClicked] = useState(false);
  const ImgTag = ImgComponents[`${props.animal.type}`];
  return (
      <div onClick={() => {
        setClicked(!clicked);
      }} className={'card'}>
        <div className={'card__head'}>
          <h1>{props.animal.name} | {props.animal.type}</h1>
          <ImgTag/>
        </div>
        {
          clicked ?
              <div>
                <p className={'card__info'}>Description: {props.animal.description}</p>
                <p className={'card__info'}>Birth Day: {props.animal.birthDay}</p>
                <p className={'card__info'}>Sex: {props.animal.sex}</p>
              </div> : null
        }
      </div>
  );
}

export default AnimalCard;