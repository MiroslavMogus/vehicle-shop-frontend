import { Vehicle } from './../../models/vehicle';
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
  vehicles: Vehicle[];
  vehiclemakes: any[];
  query: any = {};
  columns = [
    { title: 'Id' },
    { title: 'Vehicle Make', key: 'vehicleMake', isSortable: true },
    { title: 'Vehicle Model', key: 'vehicleModel', isSortable: true },
    { title: 'Contact Email', key: 'ownersEmail', isSortable: true },
    { }
  ];

  constructor(
    private vehicleService: VehicleService,
    private vehiclemakeService: VehicleMakeService
  ) {}

  ngOnInit() {
    this.vehiclemakeService
      .getVehicleMakes()
      .subscribe(vehiclemakes => (this.vehiclemakes = vehiclemakes));

    this.loadVehicles();

    }

  // tslint:disable-next-line:use-life-cycle-interface
   ngOnChange() {
    this.loadVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
      this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getVehicles(this.query)
    .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.loadVehicles();
  }

  delete() {
  }
}
