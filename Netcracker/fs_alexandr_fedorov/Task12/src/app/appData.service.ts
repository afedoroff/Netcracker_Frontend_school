import { Injectable } from '@angular/core';
import {Animal} from "./card/Animal";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private data: Animal[] = [
    new Animal('Mitch', 'Cat', 'Funny', '1 year', 'boy'),
    new Animal('Butch', 'Dog', 'Pensive', '2 years', 'boy'),
    new Animal('Kesha', 'Parrot', 'Loves to sing', '5 month', 'boy'),
    new Animal('Fluffy', 'Cat', 'Lazy', '5 month', 'girl'),
    new Animal('Bugs', 'Rabbit', 'Talkative', '3 years', 'girl'),
    new Animal('Rocky', 'Raccoon', 'Likes to wash clothes', '3 years', 'boy')
  ];
  getData(): Animal[] {
    return this.data;
  }
  constructor() { }
}
