import './AnimalCard.css';
import React, {useContext, useState} from "react";
import {Animal} from "../../models/animal";
import {Cat} from "../../../assets/Cat";
import {Dog} from "../../../assets/Dog";
import {Rabbit} from "../../../assets/Rabbit";
import {Octopus} from "../../../assets/Octopus";
import {Turtle} from "../../../assets/Turtle";
import {Pig} from "../../../assets/Pig";
import {ThemeContext} from "../App";

type TImgComponents = {
  [key: string]: React.FC
}

const ImgComponents: TImgComponents = {
  Cat: Cat,
  Dog: Dog,
  Rabbit: Rabbit,
  Turtle: Turtle,
  Octopus: Octopus,
  Pig: Pig
}

interface AnimalCardProps{
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = React.memo((props) => {
  const theme = useContext(ThemeContext);
  const [clicked, setClicked] = useState(false);
  const ImgTag = ImgComponents[props.animal.type];
  console.log('render' + props.animal.id);
  return (
    <div onClick={() => {
    setClicked(!clicked);
  }} className={'card'} style={{background: theme.card_color}}>
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
})
