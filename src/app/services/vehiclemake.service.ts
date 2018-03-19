import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehiclemakeService {

  constructor(private http: Http) { }

   getVehicleMakes() {
        return this.http.get('http://127.0.0.1:57877/api/vehiclemakes')
          .map(res => res.json());
     }
}
