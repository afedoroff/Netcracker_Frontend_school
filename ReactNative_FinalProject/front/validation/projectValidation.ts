import { create, test, enforce } from 'vest';
import {IProject} from "../components/Interfaces/Interfaces";

export const projectValidationSuite = create((data:IProject) => {
  test('projectName', 'Поле не может быть пустым!', () => {
    enforce(data.projectName).isNotEmpty();
  });
  test('projectName', 'Минимум 3 символа!', () => {
    enforce(data.projectName).longerThanOrEquals(3);
  });

  test('description', 'Поле не может быть пустым!', () => {
    enforce(data.description).isNotEmpty();
  });
  test('description', 'Минимум 3 символа!', () => {
    enforce(data.description).longerThanOrEquals(3);
  });
});