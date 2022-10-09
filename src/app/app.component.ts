import { Component, OnInit, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { House } from './house';
import { Apartment } from './apartment';
import { Person } from './person';
import { tap, map, switchMap, pluck } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  houses: House[] = [];
  apartments: Apartment[] = [];
  persons: Person[] = [];

  house: House | undefined;
  apartment: Apartment | undefined;
  person: Person | undefined;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService
      .getHouses()
      .pipe(tap((data: House[]) => (this.houses = data)))
      .subscribe();
  }

  chooseHouse(houseId: number | undefined) {
    this.httpService
      .getApatments(houseId)
      .pipe(switchMap((data: Apartment[]) => (this.apartments = data)))
      .subscribe(() =>
        this.chooseApartment(
          this.apartments.map((apartment) => apartment.apartmentId)
        )
      );
  }

  chooseApartment(apartmentsId) {
    this.httpService
      .getPerson(apartmentsId)
      .subscribe((data: Person[]) => (this.persons = data));
  }
}
