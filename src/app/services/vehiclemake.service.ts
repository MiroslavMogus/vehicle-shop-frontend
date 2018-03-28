import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehiclemakeService {

  private readonly vehiclesRoot = 'http://localhost:5787/api/vehiclemakes';
  constructor(private http: Http) { }

   getVehicleMakes() {
        return this.http.get(this.vehiclesRoot)
          .map(res => res.json());
     }

     create(vehicle) {
       return this.http.post('http://localhost:5787/api/vehicles', vehicle)
         .map(res => res.json()) ;
     }

     getVehicleMake(id) {
      return this.http.get('/api/makes')
        .map(res => res.json());
    }
}
