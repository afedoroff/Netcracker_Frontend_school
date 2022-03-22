export class Animal{
  constructor(private _name : string,
              private _type : string,
              private _description : string,
              private _age : string,
              private _sex : string) {
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get age(): string {
    return this._age;
  }

  set age(value: string) {
    this._age = value;
  }

  get sex(): string {
    return this._sex;
  }

  set sex(value: string) {
    this._sex = value;
  }
}
