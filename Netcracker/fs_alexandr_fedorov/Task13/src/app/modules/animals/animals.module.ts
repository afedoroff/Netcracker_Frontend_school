import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalCardComponent} from './components/animal-card/animal-card.component';
import {AnimalsDataService} from "./animals-data.service";
import {AnimalsComponent} from './components/animals/animals.component';

@NgModule({
  declarations: [
    AnimalCardComponent,
    AnimalsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimalCardComponent,
    AnimalsComponent
  ],
  providers: [
    AnimalsDataService
  ]
})
export class AnimalsModule {
}
