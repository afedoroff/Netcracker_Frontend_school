import {Injectable} from '@angular/core';
import {Animal} from "./models/animal";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnimalsDataService {
  private requestUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) {
  }

  public getData(): Observable<Animal[]> {
    return this.http.get(this.requestUrl).pipe(map((data: any) => {
        let animalList = data;
        return animalList.map(function (animal: Animal) {
          return {
            id: animal.id,
            name: animal.name,
            type: animal.type,
            description: animal.description,
            age: animal.age,
            sex: animal.sex
          };
        });
      }),
      catchError(err => {
        err = err.message; alert(err.message);
        return throwError(err);
      }))
  }

  public getAnimal(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.requestUrl}/${id}`).pipe(
      catchError(err => {
        err = err.message; alert(err.message);
        return throwError(err);
      }))
  }

  public editData(animal: Animal): Observable<void> {
    console.log(`${this.requestUrl}/${animal.id}`);
    return this.http.put<void>(`${this.requestUrl}/${animal.id}`, animal)
      .pipe(
        catchError(err => {
          err = err.message; alert(err.message);
          return throwError(err);
        }))
  }

  public postData(animal: Animal): Observable<Animal> {
    animal.id = Math.floor(Math.random() * 100000);
    return this.http.post<Animal>(this.requestUrl, animal)
      .pipe(catchError(err => {
        err = err.message; alert(err.message);
        return throwError(err);
      }))
  }

  public deleteData(animalId: number): Observable<void> {
    return this.http.delete<void>(`${this.requestUrl}/${animalId}`)
      .pipe(catchError(err => {
        err = err.message; alert(err.message);
        return throwError(err);
      }))
  }
}
