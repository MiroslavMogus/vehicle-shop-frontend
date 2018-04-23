import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class VehicleService {

  private readonly vehiclesRoot = environment.apiUrl + '/api/vehicles/';
  constructor(private http: Http) {  }

  create(vehicle) {
    return this.http.post(this.vehiclesRoot, vehicle).map(res => res.json());
  }

  update(putObject) {
    // tslint:disable-next-line:max-line-length
    console.log(putObject);
    return this.http.put(this.vehiclesRoot + putObject.id, putObject).map(res => res.json());
  }

  delete(id) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const options = new RequestOptions({
      headers: headers,
      body: {
        id: 123
      }
    });

    return this.http.delete(this.vehiclesRoot + id, options).map(res => res.json());
  }

  getVehicles(filter) {
    const vehicles = this.http.get(this.vehiclesRoot + '?' + this.toQueryString(filter)).map(res => res.json());
    return vehicles;
  }

  getTotalVehicles() {
    // tslint:disable-next-line:prefer-const
    let total = this.http.get(this.vehiclesRoot + '/total').map(res => res.json());
    return total;
  }

  toQueryString(obj) {
    let elements = [];

    for (var property in obj) {
      let value = obj[property];
      if (value != null && value != undefined)
        elements.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return elements.join('&');
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesRoot + id).map(res => res.json());
  }
}
