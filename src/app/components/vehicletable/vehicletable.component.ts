import { VehicleService } from './../../services/vehicle.service';
import { inject } from '@angular/core/testing';
import { VehiclemakeService } from '../../services/vehiclemake.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicletable',
  templateUrl: './vehicletable.component.html',
  styleUrls: ['./vehicletable.component.css']
})
export class VehicleTableComponent implements OnInit {
  vehicles: any[];
  allVehicles: any[];
  vehiclemakes: any[];
  filter: any = {};

  constructor(
    private vehicleService: VehicleService,
    private vehiclemakeService: VehiclemakeService
  ) {}

  ngOnInit() {
    this.vehiclemakeService
      .getVehicleMakes()
      .subscribe(vehiclemakes => (this.vehiclemakes = vehiclemakes));

    this.vehicleService
      .getVehicles()
      .subscribe(vehicles => (this.vehicles = this.allVehicles = vehicles));
  }

  onFilterChange() {
    let vehicles = this.allVehicles;

    if (this.filter.makeid) {
      vehicles = vehicles.filter(v => v.vehicleMake.id == this.filter.makeid);
    }
    this.vehicles = vehicles;
  }
  delete() {
    console.log('Just a test');
  }
}
