import { Serializer } from './../models/serializer';
import { Vehicle } from '../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VehicleSerializer } from '../models/vehicleserializer';
import { ResourceService } from './resource.service';

import { Injectable, Inject } from '@angular/core';

@Injectable()
export class VehicleTestService extends ResourceService<Vehicle> {
    constructor(httpClient: HttpClient) {
      super(
        httpClient,
        environment.apiUrl,
        'api/vehicles/',
         new VehicleSerializer());
    }

  }
