import { create, test, enforce } from 'vest';
import {ITask} from "../components/Interfaces/Interfaces";

export const taskCreateValidationSuite = create((data:ITask) => {
  test('taskName', 'Поле не может быть пустым!', () => {
    enforce(data.taskName).isNotEmpty();
  });
  test('taskName', 'Минимум 3 символа!', () => {
    enforce(data.taskName).longerThanOrEquals(3);
  });

  test('priority', 'Выберите приоритет!', () => {
    enforce(data.priority).isNotEmpty();
  });

  test('description', 'Поле не может быть пустым!', () => {
    enforce(data.description).isNotEmpty();
  });
  test('description', 'Минимум 3 символа!', () => {
    enforce(data.description).longerThanOrEquals(3);
  });

  test('participantID', 'Выберите исполнителя!', () => {
    enforce(data.participantID).isNotEmpty();
  });

  test('type', 'Выберите тип задачи!', () => {
    enforce(data.type).isNotEmpty();
  });

  test('component', 'Выберите компонент!', () => {
    enforce(data.component).isNotEmpty();
  });

  test('endDate', 'Выберите дату окончания!', () => {
    enforce(data.endDate).isNotBlank();
  });

  test('startDate', 'Выберите дату начала!', () => {
    enforce(data.startDate).isNotBlank();
  });
});

export const taskEditValidationSuite = create((data:ITask) => {
  test('taskName', 'Поле не может быть пустым!', () => {
    enforce(data.taskName).isNotEmpty();
  });
  test('taskName', 'Минимум 3 символа!', () => {
    enforce(data.taskName).longerThanOrEquals(3);
  });

  test('description', 'Поле не может быть пустым!', () => {
    enforce(data.description).isNotEmpty();
  });
  test('description', 'Минимум 3 символа!', () => {
    enforce(data.description).longerThanOrEquals(3);
  });

  test('endDate', 'Выберите дату окончания!', () => {
    enforce(data.endDate).isNotBlank();
  });

  test('startDate', 'Выберите дату начала!', () => {
    enforce(data.startDate).isNotBlank();
  });
});