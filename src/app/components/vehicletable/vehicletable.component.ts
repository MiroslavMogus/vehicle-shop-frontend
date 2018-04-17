import { Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { inject } from "@angular/core/testing";
import { VehicleMakeService } from "../../services/vehiclemake.service";
import { Component, OnInit, SimpleChanges, Input } from "@angular/core";
import { NgbModule, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter } from "events";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
  selector: "app-vehicletable",
  templateUrl: "./vehicletable.component.html",
  styleUrls: ["./vehicletable.component.css"]
})
export class VehicleTableComponent implements OnInit {
  test: EventEmitter;
  page: number;
  totalVehicles: number;
  total = 1;
  vehicles: Vehicle[];
  vehiclemakes: any[];
  query: any = {};
  currentPage: number;

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
    this.getTotalVehicles();

    this.vehiclemakeService
      .getVehicleMakes()
      .subscribe(vehiclemakes => (this.vehiclemakes = vehiclemakes));
    this.loadVehicles(this.page);
    this.setNumberOfPages();
  }

  getTotalVehicles() {
    this.vehicleService
    .getTotalVehicles()
    .subscribe(total => (this.total = total));
  }

/**
 * This function is used to calculate pagination.
 * It will set how much pages will be showed at
 * the bottom of table.
 */
  setNumberOfPages() {
    if (this.total % 10 !== 0) {
      // tslint:disable-next-line:radix
      let numberToSet = toInteger(this.total);
      numberToSet = numberToSet / 10;
      numberToSet = numberToSet + 1;
      numberToSet = numberToSet * 10;
      this.total = numberToSet;
  } else {
      // tslint:disable-next-line:prefer-const
      let numberToSet = this.total;
      this.total = numberToSet;
  }
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
    this.page = 1;
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
      this.query.pageSize = 10;
      this.query.sortBy = 'vehicleMake';
      this.query.isSortAscending = true;
    } else {
      this.query.page = page;
      this.query.pageSize = 10;
      this.query.sortBy = this.query.sortBy;
      this.query.isSortAscending = this.query.isSortAscending;
    }
    this.currentPage = page;
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
