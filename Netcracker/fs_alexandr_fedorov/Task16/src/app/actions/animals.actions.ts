import {Action} from "@ngrx/store";
import {Animal} from "../modules/animals/models/animal";

export  enum AnimalActionsTypes {
  ADD = '[ANIMALS] create animal node'
}

export class AddAnimalAction implements Action {
  readonly type = AnimalActionsTypes.ADD;

  constructor(public payload: Animal) {}
}

export type AnimalsAction = AddAnimalAction;
