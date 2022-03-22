import './AnimalCard.css';
import React, {useContext} from "react";
import {Cat} from "../assets/Cat";
import {Dog} from "../assets/Dog";
import {Rabbit} from "../assets/Rabbit";
import {Turtle} from "../assets/Turtle";
import {Pig} from "../assets/Pig";
import {Octopus} from "../assets/Octopus";
import {Animal} from "../models/animal";
import {ThemeContext} from "../App";
import {useHistory} from 'react-router-dom';


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

interface AnimalCardProps {
    animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = React.memo((props) => {
    const theme = useContext(ThemeContext);
    const ImgTag = ImgComponents[props.animal.type];
    let history = useHistory();
    function handleClick() {
        history.push({
            pathname: `/pet/${props.animal.id}`,
            state: props.animal
        });
    }
    return (
        <div onClick={handleClick} className={'card'} style={{background: theme.card_color}}>
            <div className={'card__head'}>
                <h1>{props.animal.name} | {props.animal.type}</h1>
                <ImgTag/>
            </div>
        </div>
    );
})
