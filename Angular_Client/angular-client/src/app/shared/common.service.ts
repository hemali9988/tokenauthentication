import { HttpClient } from '@angular/common/http';
import { City } from './../model/city.model';
import { State } from './../model/state.model';
import { Country } from './../model/country.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   url = 'http://localhost:5000/api/demo/';
  listCountry: Country[];
  listState: State[];
  listCity: City[];
  constructor(private http: HttpClient) { }

  CountryList(){
    this.http.get(this.url+'countrydetails').toPromise().then(result=>this.listCountry=result as Country[]);
    console.log(this.listCountry);
  }

  StateByCountry(countryID:string){
    this.http.get(this.url+'StateDetails/'+countryID).toPromise().then(result=>this.listState=result as State[]);
  }

  DistrictByState(stateID:string){
    this.http.get(this.url+'CityDetails/'+stateID).toPromise().then(result=>this.listCity=result as City[]);
  }
}
