import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Animal, Types} from "../../models/animal";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.less']
})
export class AddFormComponent implements OnInit {
  public animal: Animal = <Animal>{};
  public types = Types;
  @Output()
  public newAnimalEvent: EventEmitter<Animal> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }

  public onSumited() {
    this.newAnimalEvent.emit(this.animal);
  }
}
