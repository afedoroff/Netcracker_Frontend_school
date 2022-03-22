import { Animal } from "models/animal";

export class AnimalsDataService {
  _data = [
    new Animal(1,'Mitch', 'Cat', 'Funny', '22.10.2000', 'boy'),
    new Animal(2,'Butch', 'Dog', 'Pensive', '22.10.2000', 'boy'),
    new Animal(3,'Kesha', 'Octopus', 'Loves to sing', '22.10.2000', 'boy'),
    new Animal(4,'Fluffy', 'Cat', 'Lazy', '22.10.2000', 'girl'),
    new Animal(5,'Bugs', 'Rabbit', 'Talkative', '22.10.2000', 'girl'),
    new Animal(6,'Rocky', 'Turtle', 'Likes to wash clothes', '22.10.2000', 'boy')
  ];

  getData(): Animal[] {
    return this._data;
  }
}
