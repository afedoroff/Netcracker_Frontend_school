class PrimaryObject {
    constructor(protected _name: string) {
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
}

class Cinema extends PrimaryObject {

    constructor(protected _name :string, private _address: string,
                private _movieList: Movie[], private _contacts: CinemaContact) {
        super(_name);
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get movieList() {
        return this._movieList;
    }

    private addMovie(movie: Movie) {
        this._movieList.push(movie);
    }

    private removeMovie(name: string) {
        this._movieList = this._movieList.filter(m => m.name != name);
    }

    get contacts() {
        return this._contacts;
    }

    set contacts(contacts) {
        this._contacts = contacts;
    }
}

class CinemaContact {
    constructor(private _phone: string, private _email: string, private _site: string) {
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = phone;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get site() {
        return this._site;
    }

    set site(site) {
        this._site = site;
    }
}

class Movie extends PrimaryObject {
    constructor(protected _name :string, private _director: string, private _genreList: Genre[]) {
        super(_name);
    }

    get director() {
        return this._director;
    }

    set director(director) {
        this._director = director;
    }

    get genreList() {
        return this._genreList;
    }

    set genreList(genreList) {
        this._genreList = genreList;
    }

    addGenre(genre: Genre) {
        this._genreList.push(genre);
    }

    removeGenre(name: string) {
        this._genreList = this._genreList.filter(m => m.name !== name);
    }
}

class Genre extends PrimaryObject {
    constructor(protected _name :string, private _description: string) {
        super(_name);
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }
}

/*
Factory
*/

abstract class Creator {
    abstract factoryMethod(...args: any[]): PrimaryObject;
}

function logger(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    debugger;
    descriptor.value = function () {
        const returnValue = originalMethod(arguments);
        console.log(`Object ${returnValue.constructor.name} created!`);
        return returnValue;
    }
}

class CinemaCreator extends Creator {
    @logger
    factoryMethod(args: [string, string, Movie[], CinemaContact]): Cinema{
        return new Cinema(...args);
    }
}

class MovieCreator extends Creator {
    @logger
    factoryMethod(args: [string, string, Genre[]]): Movie {
        return new Movie(...args);
    }
}

class GenreCreator extends Creator{
    factoryMethod(args: [string, string]): Genre {
        return new Genre(...args);
    }
}
