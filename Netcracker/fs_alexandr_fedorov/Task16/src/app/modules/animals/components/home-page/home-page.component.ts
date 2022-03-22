import {Component} from "@angular/core";
import {Animal} from "../../models/animal";
import {AnimalsDataService} from "../../animals-data.service";
import {concatMap} from "rxjs/operators";
import {AppState} from "../../models/app-state.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent {
  public cards: Animal[] = [];
  public animal: Animal = <Animal>{};
  public animalClicked: boolean;
  public hideCats : boolean = false;
  animalsItems$: Observable<Animal[]>;
  constructor(private service: AnimalsDataService, private store: Store<AppState>) {
    this.animalClicked = false;
  }
  ngOnInit() {
    //this.getAnimals();
    this.animalsItems$ = this.store.select(store => store.animals)
  }

  private getAnimals(): void{
    this.service.getData().subscribe(
      data=>{
        this.store.select(store => store.animals = data)
      }
    );
  }

  public hideCatsEvent(): void{
    this.hideCats = !this.hideCats;
  }

  public setAnimal(animal: Animal): void{
    this.animalClicked = true;
    this.animal = animal;
  }

  public newAnimalEvent(animal: Animal): void{
    this.service.postData(animal).pipe(
      concatMap(_ => this.service.getData())
    ).subscribe(data => {
      this.cards=data;
    })
  }

  public deleteAnimal(): void{
    this.service.deleteData(this.animal.id).pipe(
      concatMap(_ => this.service.getData())
    ).subscribe(data => {
      this.cards=data;
    })
  }

  public getId(id: number, animal: Animal){
    return animal.id;
  }
}
