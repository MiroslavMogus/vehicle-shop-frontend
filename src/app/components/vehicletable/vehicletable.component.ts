import { Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { inject } from "@angular/core/testing";
import { VehicleMakeService } from "../../services/vehiclemake.service";
import { Component, OnInit, SimpleChanges } from "@angular/core";
import { NgbModule, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter } from "events";

@Component({
  selector: "app-vehicletable",
  templateUrl: "./vehicletable.component.html",
  styleUrls: ["./vehicletable.component.css"]
})
export class VehicleTableComponent implements OnInit {
  test: EventEmitter;
  page: NgbPagination;
  vehicles: Vehicle[];
  vehiclemakes: any[];
  query: any = {};

 /**
  * columns object to detect which columns inside table are sortable
  * and how to sort it.
  * This is the example from component.html how this is used
  * <div *ngIf="c.isSortable" (click)="sortBy(c.key)">
  * {{ c.title }}
  */
  columns = [
    { title: "Id" },
    { title: "Vehicle Make", key: "vehicleMake", isSortable: true },
    { title: "Vehicle Model", key: "vehicleModel", isSortable: true },
    { title: "Contact Email", key: "ownersEmail", isSortable: true },
    {}
  ];

  constructor(
    private vehicleService: VehicleService,
    private vehiclemakeService: VehicleMakeService
  ) {}

  ngOnInit() {
    this.vehiclemakeService
      .getVehicleMakes()
      .subscribe(vehiclemakes => (this.vehiclemakes = vehiclemakes));

    this.loadVehicles(this.page);
  }

 /**
 * Logic for sorting of columns that can then be sorted in the table.
 *
 * After query is set method calls loadVehicles() that will load the vehicles
 * from server.
 *
 * @param  name the name of the columnName, relative to the column in table
 * @return      void the vehicles that are sorted are updated according to query
 */
  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.loadVehicles(this.page);
  }

/**
 * Vehicles loading from service class according to query object.
 * Default first page in pagination is set by asigning this.query.page to 1.
 *
 * After query is set method calls loadVehicles() that will load the vehicles
 * from server.
 *
 * @param  name page object from pagination component stores current clicked page number
 * @return      void the vehicles are updated from API
 */
  loadVehicles(page) {
    if (isNaN(page)) {
      this.query.page = 1;
      this.query.pageSize = 3;
      this.query.sortBy = 'vehicleMake';
      this.query.isSortAscending = true;
    } else {
      this.query.page = page;
      this.query.pageSize = 3;
      this.query.sortBy = this.query.sortBy;
      this.query.isSortAscending = this.query.isSortAscending;
    }
    this.vehicleService
      .getVehicles(this.query)
      .subscribe(vehicles => (this.vehicles = vehicles));
  }

/**
 * After dropdown is changed onFilterChange() is activated.
 *
 * After query is set method calls loadVehicles() again that will load the vehicles
 * from server.
 *
 * @param  name empty parameter
 * @return      void the vehicles are updated from API
 */
  onFilterChange() {
    this.loadVehicles(this.page);
  }
}
