import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { House } from './house';
import { Apartment } from './apartment';
import { Person } from './person';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getHouses(): Observable<House[]> {
    return this.http.get('assets/houses.json').pipe(
      map((data: any) => {
        let housesList = data;
        return housesList.map(function (house: any) {
          return new House(house.id, house.name);
        });
      })
    );
  }

  getApatments(houseId): Observable<Apartment[]> {
    return this.http.get('assets/apartments.json').pipe(
      map((data: any) => {
        let apartmentList = data;

        return apartmentList
          .filter((apartment) => apartment.hid === houseId)
          .map(function (apartment: any) {
            return new Apartment(
              apartment.id,
              apartment.hid,
              apartment.name,
              apartment.area
            );
          });
      })
    );
  }

  getPerson(apartmentId): Observable<Person[]> {
    return this.http.get('assets/persons.json').pipe(
      map((data: any) => {
        let personList = data;

        return personList
          .filter((person) => apartmentId.includes(person.aid))
          .map(function (person: any) {
            return new Person(person.number, person.aId, person.name);
          });
      })
    );
  }
}
