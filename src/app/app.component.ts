import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import { House } from './house'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  houses: House[]=[];

  constructor(private httpService: HttpService){}

  ngOnInit(){
          
    this.httpService.getHouses().subscribe((data:House[]) => this.houses=data);
}

}
