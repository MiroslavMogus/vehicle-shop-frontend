import { inject } from '@angular/core/testing';
import { VehiclemakeService } from '../../services/vehiclemake.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicleinput',
  templateUrl: './vehicleinput.component.html',
  styleUrls: ['./vehicleinput.component.css']
})
export class VehicleInputComponent implements OnInit {
  vehicleMakes: any [];
  vehicleModels: any [];
  vehicle: any = {};

  constructor(private vehicleMakeService: VehiclemakeService) {}

  ngOnInit() {
    this.vehicleMakeService.getVehicleMakes().subscribe(vehicleMakes => {
      this.vehicleMakes = vehicleMakes;

      console.log('Vehicle Makes', this.vehicleMakes);
    });
  }

  onVehicleMakeChange() {
    let selectedVehicleMake = this.vehicleMakes.find(m => m.id == this.vehicle.make);
    this.vehicleModels = selectedVehicleMake.vehicleModels;
    console.log('Vehicle', this.vehicle);
  }
}
