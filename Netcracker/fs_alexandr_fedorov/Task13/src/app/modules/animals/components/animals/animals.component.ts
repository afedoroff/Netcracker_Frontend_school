import { Component } from '@angular/core';
import {Animal} from "../../models/animal";
import {AnimalsDataService} from "../../animals-data.service";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.less']
})
export class AnimalsComponent {
  public cards: Animal[];
  public animal: Animal = <Animal>{};
  public hideCats : boolean = false;
  constructor(private service: AnimalsDataService) {
    this.cards = service.getData();
  }
  public hideCatsEvent(): void{
    this.hideCats = !this.hideCats;
  }

  public setAnimal(animal: Animal): void{
    this.animal = animal;
  }
}
