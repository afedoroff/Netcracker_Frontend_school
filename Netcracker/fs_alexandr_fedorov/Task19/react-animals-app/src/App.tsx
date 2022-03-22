import React, {useState} from 'react';
import './App.css';
import {AnimalsList} from "./components/AnimalsList";
import {AnimalDetails} from "./components/AnimalDetails";
import {themes} from "./themes";
import {AnimalsDataService} from "./services/animalDataService";
import {Logo} from "./assets/Logo";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


export const ThemeContext = React.createContext(themes.light);

const App: React.FC = () => {
    const service: AnimalsDataService = new AnimalsDataService();
    const animals = service.getData();
    const [theme, setTheme] = useState(themes.light);
    return (
        <ThemeContext.Provider value={theme}>
            <Router>
                <div className={'wrapper'} style={{background: theme.main_color, color: theme.text_color}}>
                    <header style={{background: theme.header_color}}>
                        <div className={'flex'}>
                            <Logo/>
                            <h1>Cute Animals :3</h1>
                        </div>
                        <button className={'header__btn '}
                                onClick={() => {
                                    if (theme === themes.light) setTheme(themes.dark)
                                    else setTheme(themes.light)
                                }}>
                            Dark Mode
                        </button>
                    </header>
                    <section>
                        <Switch>
                            <Route exact path="/">
                                <AnimalsList animals={animals}/>
                            </Route>
                            <Route exact path='/pet/:id'>
                                <AnimalDetails/>
                            </Route>
                        </Switch>
                    </section>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
