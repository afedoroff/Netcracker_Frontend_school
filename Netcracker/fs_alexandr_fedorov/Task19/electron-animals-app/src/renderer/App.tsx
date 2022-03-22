import React, {useState} from 'react';
import './App.css';
import {Logo} from "../../assets/Logo";
import {themes} from "../themes";
import {AnimalsDataService} from "../services/animalDataService";
import {AnimalsList} from "./components/AnimalsList";


export const ThemeContext = React.createContext(themes.light);

const App: React.FC = () => {
  const service: AnimalsDataService = new AnimalsDataService();
  const animals = service.getData();
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={theme}>
      <div className={'wrapper'} style={{ background: theme.main_color, color: theme.text_color}}>
        <header style={{ background: theme.header_color}}>
          <div className={'flex'}>
            <Logo/>
            <h1>Cute Animals :3</h1>
          </div>
          <button className={'header__btn '}
                  onClick={() => {
                    if(theme === themes.light) setTheme(themes.dark)
                    else setTheme(themes.light)
                  }}>
            Dark Mode
          </button>
        </header>
        <section>
          <AnimalsList animals={animals}/>
        </section>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
