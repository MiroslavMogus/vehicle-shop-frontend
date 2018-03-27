import { inject } from '@angular/core/testing';
import { VehiclemakeService } from '../../services/vehiclemake.service';
import { VehicleService } from '../../services/vehicle.service';
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

  constructor(private vehicleMakeService: VehiclemakeService, private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleMakeService.getVehicleMakes().subscribe(vehicleMakes => {
      this.vehicleMakes = vehicleMakes;

      console.log('Vehicle Makes', this.vehicleMakes);
      
    });
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }

  onVehicleMakeChange() {
    let selectedVehicleMake = this.vehicleMakes.find(m => m.id == this.vehicle.vehiclemakeid);
    this.vehicleModels = selectedVehicleMake.vehicleModels;
    
    console.log('Vehicle', this.vehicle);

  }

  onVehicleModelChange() {
  
    
    console.log('Vehicle', this.vehicle);

  }

}
