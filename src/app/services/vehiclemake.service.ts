import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class VehicleMakeService {

  private readonly vehiclesRoot = environment.apiUrl + '/api/vehicles';
  private readonly vehicleMakesRoot = environment.apiUrl + '/api/vehiclemakes/';

  constructor(private http: Http) { }

   getVehicleMakes() {
        return this.http.get(this.vehicleMakesRoot)
          .map(res => res.json());
     }

     create(vehicle) {
       return this.http.post(this.vehiclesRoot + this.vehiclesRoot, vehicle)
         .map(res => res.json()) ;
     }
}
