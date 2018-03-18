import { TestBed, inject } from '@angular/core/testing';

import { VehiclemakeService } from './vehiclemake.service';

describe('VehiclemakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclemakeService]
    });
  });

  it('should be created', inject([VehiclemakeService], (service: VehiclemakeService) => {
    expect(service).toBeTruthy();
  }));
});
