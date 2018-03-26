import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehiclemakeService {

  constructor(private http: Http) { }

   getVehicleMakes() {
        return this.http.get('http://localhost:5787/api/vehiclemakes')
          .map(res => res.json());
     }

     create(vehicle) {
       return this.http.post('http://localhost:5787/api/vehicles', vehicle)
         .map(res => res.json()) ;
     }
}
