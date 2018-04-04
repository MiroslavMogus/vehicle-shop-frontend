import { Vehicle } from './../../models/vehicle';
import { inject } from '@angular/core/testing';
import { VehicleMakeService } from '../../services/vehiclemake.service';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicleinput',
  templateUrl: './vehicleinput.component.html',
  styleUrls: ['./vehicleinput.component.css']
})
export class VehicleInputComponent implements OnInit {
  vehicleMakes: any[];
  vehicleModels: any[];
  vehicle: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleMakeService: VehicleMakeService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
      this.vehicle = { vehiclemakeid: 0, vehiclemodelid: 0, owneremail: ''};
      this.vehicleMakeService.getVehicleMakes().subscribe(vehicleMakes => {
      this.vehicleMakes = vehicleMakes;
    });
  }

  async submit() {
    await this.vehicleService.create(this.vehicle).subscribe(vehicle => {
      this.vehicle = vehicle;
      this.router.navigate(['/vehicles/']);
    });
  }

  onVehicleMakeChange() {
    let selectedVehicleMake = this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }

  onVehicleModelChange() {
    let selectedVehicleMake = this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }

  onVehicleEmailChange() {
    let selectedVehicleMake = this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }
}
