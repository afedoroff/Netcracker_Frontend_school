export class Animal {
  _id;
  _name;
  _type;
  _description;
  _birthDay;
  _sex;

  constructor(id, name, type, desc, birthDay, sex) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._description = desc;
    this._birthDay = birthDay;
    this._sex = sex;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get birthDay() {
    return this._birthDay;
  }

  set birthDay(value) {
    this._birthDay = value;
  }

  get sex() {
    return this._sex;
  }

  set sex(value) {
    this._sex = value;
  }
}
