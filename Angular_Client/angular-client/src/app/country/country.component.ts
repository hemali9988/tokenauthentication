import { Country } from './../model/country.model';
import { CommonService } from './../shared/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private service:CommonService) { }

  ngOnInit() {
    this.service.CountryList();
  }

  BindState(countryId:string)
  {
    this.service.StateByCountry(countryId);
  }

  BindCity(stateId:string){
    this.service.DistrictByState(stateId);
  }

}
