import { VehicleService } from './../../services/vehicle.service';
import { inject } from '@angular/core/testing';
import { VehicleMakeService } from '../../services/vehiclemake.service';
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
    private vehiclemakeService: VehicleMakeService
  ) {}

  ngOnInit() {
    this.vehiclemakeService
      .getVehicleMakes()
      .subscribe(vehiclemakes => (this.vehiclemakes = vehiclemakes));

    this.vehicleService
      .getVehicles()
      .subscribe(vehicles => (this.vehicles = this.allVehicles = vehicles));

    }

  // tslint:disable-next-line:use-life-cycle-interface
   ngOnChange() {
    let vehicles = this.allVehicles;
    this.vehicles = vehicles;
  }

  onFilterChange() {
    let vehicles = this.allVehicles;

    if (this.filter.makeid) {
      vehicles = vehicles.filter(v => v.vehicleMake.id == this.filter.makeid);
    }
    this.vehicles = vehicles;
  }
  delete() {
  }
}
