/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleTestService } from './vehicletest.service';

describe('Service: Vehicletest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleTestService]
    });
  });

  it('should ...', inject([VehicleTestService], (service: VehicleTestService) => {
    expect(service).toBeTruthy();
  }));
});
