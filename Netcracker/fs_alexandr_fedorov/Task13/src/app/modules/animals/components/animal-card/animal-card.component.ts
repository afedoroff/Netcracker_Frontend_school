import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Animal} from "../../models/animal";

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less']
})
export class AnimalCardComponent implements OnInit {

  @Input()
  public animal: Animal = <Animal>{}
  @Output()
  public clickedAnimal: EventEmitter<Animal> = new EventEmitter();
  public click: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(Object.values(this.animal));
  }

  public clickEvent(): void {
    this.click = !this.click;
    this.clickedAnimal.emit(this.animal)
  }
}
