import {create, enforce, test} from "vest";
import { IUser} from "../components/Interfaces/Interfaces";
import {AuthorizationFormFields} from "../components/Auth/Authorization";

export const registrationValidationSuite = create((data:IUser) => {
  test('username', 'Поле не может быть пустым!', () => {
    enforce(data.username).isNotEmpty();
  });
  test('username', 'Минимум 3 символа!', () => {
    enforce(data.username).longerThanOrEquals(3);
  });

  test('firstName', 'Поле не может быть пустым!', () => {
    enforce(data.firstName).isNotEmpty();
  });
  test('firstName', 'Минимум 2 символа!', () => {
    enforce(data.firstName).longerThanOrEquals(2);
  });

  test('lastName', 'Поле не может быть пустым!', () => {
    enforce(data.lastName).isNotEmpty();
  });
  test('lastName', 'Минимум 3 символа!', () => {
    enforce(data.lastName).longerThanOrEquals(3);
  });

  test('type', 'Выберите специальность!', () => {
    enforce(data.type).isNotEmpty();
  });

  test('password', 'Поле не может быть пустым!', () => {
    enforce(data.password).isNotEmpty();
  });
  test('password', 'Минимум 8 символа!', () => {
    enforce(data.password).longerThanOrEquals(8);
  });
  test('password', 'Пароль дожен содержать одну цифру!', () => {
    enforce(data.password).matches(/[0-9]+/);
  });

  test('email', 'Поле не может быть пустым!', () => {
    enforce(data.email).isNotEmpty();
  });
  test('email', 'Неверный формат email!', () => {
    enforce(data.email).matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  });
});

export const authorizationValidationSuite = create((data: AuthorizationFormFields) => {
  test('username', 'Введите логин!', () => {
    enforce(data.username).isNotEmpty();
  });

  test('password', 'Введите пароль!', () => {
    enforce(data.password).isNotEmpty();
  });
});