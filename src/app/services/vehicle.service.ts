import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {



  private readonly vehiclesRoot = 'http://localhost:5787/api/vehicles/';
  constructor(private http: Http) {  }

  create(vehicle) {
    return this.http.post(this.vehiclesRoot, vehicle).map(res => res.json());
  }

  update(putObject) {
    // tslint:disable-next-line:max-line-length
    return this.http.put(this.vehiclesRoot + putObject.id, putObject).map(res => res.json());
  }

  delete(id) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers,
      body: {
        id: 123
      }
    });

    return this.http.delete(this.vehiclesRoot + id, options).map(res => res.json().data);
  }

  getVehicles() {
    return this.http.get(this.vehiclesRoot).map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesRoot + id).map(res => res.json());
  }
}
