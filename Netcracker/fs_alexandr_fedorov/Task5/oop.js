class PrimaryObject{
    _name;
    constructor(name) {
        this._name = name;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
}


class Cinema extends PrimaryObject{
    _address;
    _movieList;
    _contacts;

    constructor(name, address, movieList = [], contacts = new CinemaContact()) {
        super(name);
        this._address = address;
        this._movieList = movieList;
        this._contacts = contacts;
    }

    get address(){
        return this._address;
    }
    set address(address){
        this._address = address;
    }

    get movieList(){
        return this._movieList;
    }

    addMovie(movie){
        this._movieList.push(movie);
    }
    removeMovie(name){
        this._movieList = this._movieList.filter(m => m.name !== name);
    }

    get contacts(){
        return this._contacts;
    }
    set contacts(contacts){
        this._contacts = contacts;
    }
}

class CinemaContact{
    _phone;
    _email;
    _site;
    get phone(){
        return this._phone;
    }
    set phone(phone){
        this._phone = phone;
    }
    get email(){
        return this._email;
    }
    set email(email){
        this._email = email;
    }
    get site(){
        return this._site;
    }
    set site(site){
        this._site = site;
    }
}

class Movie extends PrimaryObject{
    _director;
    _genreList;
    constructor(name, director, genreList = []) {
        super(name);
        this._director = director;
        this._genreList = genreList;
    }
    get director(){
        return this._director;
    }
    set director(director){
        this._director = director;
    }
    get genreList(){
        return this._genreList;
    }
    set genreList(genreList){
        this._genreList = genreList;
    }
    addGenre(genre){
        this._genreList.push(genre);
    }

    removeGenre(name){
        this._genreList = this._genreList.filter(m => m.name !== name);
    }
}

class Genre extends PrimaryObject{
    _description;
    constructor(name, description) {
        super(name);
        this._description = description;
    }
    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }
}