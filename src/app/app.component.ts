import { Component, OnInit, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { House } from './house';
import { Apartment } from './apartment';
import { Person } from './person';
import { tap, map, switchMap, pluck } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  keywordApartments = 'apartmentName';
  keyword = 'name';

  myForm: FormGroup;
  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      house: new FormControl(null),
      apartment: new FormControl(),
      person: new FormControl(),
    });
  }

  ngOnInit() {
    this.httpService
      .getHouses()
      .pipe(tap((data: House[]) => (this.houses = data)))
      .subscribe();
  }

  chooseHouse(houseId: number | undefined) {
    console.log('houseId', houseId);
    this.httpService
      .getApatments(houseId)
      .pipe(
        switchMap((data: Apartment[]) => {
          return (this.apartments = data);
        })
      )
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

  selectEvent(item) {
    console.log('selectEvent', this.apartments);
    // do something with selected item
  }

  onChangeSearch(val: string) {
    console.log('onChangeSearch', this.apartments);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
    console.log('onFocused', this.apartments);
  }

  selectEventApartments(item) {
    // do something with selected item
    console.log('selectEventApartments', this.apartments);
  }

  onChangeSearchApartments(val: string) {
    console.log('onChangeSearchApartments', this.apartments);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocusedApartments(e) {
    // do something when input is focused
  }
}
