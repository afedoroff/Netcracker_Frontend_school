import './AnimalDetails.css';
import React, {useContext} from "react";
import {Animal} from "../models/animal";
import {ThemeContext} from "../App";
import {useHistory, useLocation} from "react-router-dom";

export const AnimalDetails: React.FC = () => {
    const theme = useContext(ThemeContext);
    const animal = useLocation<Animal>();
    let history = useHistory();
    return (
        <div>
            <div className={'card'} style={{background: theme.card_color, display: 'block'}}>
                <h1>Name: {animal.state.name}</h1>
                <h3>Type: {animal.state.type}</h3>
                <h3>Description: {animal.state.description}</h3>
                <h3>Birth Day: {animal.state.birthDay}</h3>
                <h3>Sex: {animal.state.sex}</h3>
            </div>
            <div>
                <button onClick={() => history.goBack()} className={'block__link'}>Go Back</button>
            </div>
        </div>
    );
}
