import { Component, OnInit, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { House } from './house';
import { Apartment } from './apartment';
import { Person } from './person';
import { tap, map, switchMap, pluck } from 'rxjs';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

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
  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      house: null,
      apartment: null,
      person: null,
    });
  }

  get houseName() {
    return this.myForm.controls.house?.value?.houseName;
  }
  get fullApartment() {
    return this.apartments.map((apartment) => ({
      ...apartment,
      apartmentName: `${this.houseName} ${apartment.apartmentName}`,
    }));
  }

  ngOnInit() {
    this.httpService
      .getHouses()
      .pipe(tap((data: House[]) => (this.houses = data)))
      .subscribe();
  }

  chooseHouse(houseId: number | undefined) {
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
  }

  selectEventApartments(item) {
    // do something with selected item
  }

  onChangeSearchApartments(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocusedApartments(e) {
    // do something when input is focused
  }
}
