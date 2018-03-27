import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

    private readonly vehiclesRoot = 'http://localhost:5787/api/vehicles';
    constructor(private http: Http) { }

    create(vehicle) {
        return this.http.post(this.vehiclesRoot, vehicle)
          .map(res => res.json()) ;
      }

    getVehicles() {
        return this.http.get(this.vehiclesRoot)
            .map(res => res.json());
      }
}