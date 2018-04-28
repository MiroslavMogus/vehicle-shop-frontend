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
  vehicle = new Vehicle();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleMakeService: VehicleMakeService,
    private vehicleService: VehicleService
  ) {}

  async ngOnInit() {
      await this.vehicleMakeService.getVehicleMakes().subscribe(vehicleMakes => {
      this.vehicleMakes = vehicleMakes;
    });
  }

  async submit() {
    await this.vehicleService.create(this.vehicle).subscribe(vehicle => {
      this.vehicle = vehicle;
      this.router.navigate(['/vehicles/']);
    });
  }

  async onVehicleMakeChange() {
    let selectedVehicleMake = await this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }

  async onVehicleModelChange() {
    let selectedVehicleMake = await this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }

  async onVehicleEmailChange() {
    let selectedVehicleMake = await this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
  }
}
