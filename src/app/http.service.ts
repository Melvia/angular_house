import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { House } from './house';

@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    getHouses() : Observable<House[]>{
        return this.http.get('assets/houses.json').pipe(
            
            map((data:any) => {
                let housesList = data;
                return housesList.map(function(house:any) {
                    return new House(house.id, house.name);
                })
            })
        )
    }
}