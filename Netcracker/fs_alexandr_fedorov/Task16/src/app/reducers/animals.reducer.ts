import {Animal} from "../modules/animals/models/animal";
import {AnimalActionsTypes, AnimalsAction} from "../actions/animals.actions";
import {AnimalsDataService} from "../modules/animals/animals-data.service";

export const ANIMAL_REDUCER_NODE = 'animal'
const initialState: Animal[] =

[
  new Animal(82297, "Александр", "Parrot", "dsd", "2021-11-13", "boy")
]

export function AnimalReducer(state: Animal[] = initialState, action: AnimalsAction) {
  switch (action.type) {
    case AnimalActionsTypes.ADD:
      return [...state, action.payload]
    default :
      return state;
  }
}
