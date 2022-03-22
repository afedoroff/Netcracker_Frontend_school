import './App.css';
import Logo from "./assets/Logo";
import {AnimalsDataService} from "./animalDataService";
import AnimalsList from "./components/animalsList/AnimalsList";

function App() {
  const service = new AnimalsDataService();
  const animals = service.getData();
  return (
      <div className={'wrapper'}>
        <header>
          <Logo className={'header__logo'}/>
          <h1>Cute Animals :3</h1>
        </header>
        <section>
          <AnimalsList animals={animals}/>
        </section>
      </div>
  );
}

export default App;
