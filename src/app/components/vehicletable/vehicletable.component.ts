import { QueryOptions } from "./../../models/query-options";
import { VehicleTestService } from "./../../services/vehicletest.service";
import { Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { inject } from "@angular/core/testing";
import { VehicleMakeService } from "../../services/vehiclemake.service";
import { Component, OnInit, SimpleChanges, Input } from "@angular/core";
import { NgbModule, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter } from "events";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
//import { QueryOptions } from '../../models/query-options';

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
  vehicle: Vehicle;

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
    private vehicleTestService: VehicleTestService,
    private vehicleService: VehicleService,
    private vehiclemakeService: VehicleMakeService,
    private queryOptions: QueryOptions
  ) {}

  ngOnInit() {
    // Get total numbers of vehicles
    // for pagination calculation
    this.getTotalVehicles();

    // Get only one vehicle from service
    this.vehicleTestService
      .read(71)
      .subscribe(vehicle => (this.vehicle = vehicle));

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
    // Sets pagination page to 1 because it is sorted
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
    /* First time loading of vehicles from database */
    if (isNaN(page)) {
      this.query.page = 1;
      this.query.pageSize = 10;
      /* We don't need this here first time when
       * page loads
       * this.query.sortBy = 'vehicleMake';
       */
      this.query.isSortAscending = true;
    } else {
      this.query.page = page;
      // This can be later changed dynamically in administration
      this.query.pageSize = 10;
      this.query.sortBy = this.query.sortBy;
      this.query.isSortAscending = this.query.isSortAscending;
    }
    this.currentPage = page;

    /* Old way of reading vehicles from api
    this.vehicleService
      .getVehicles(this.query)
      .subscribe(vehicles => (this.vehicles = vehicles));
    */

    // Define properties to send in URL
    this.queryOptions.page = this.query.page;
    this.queryOptions.pageSize = this.query.pageSize;
    this.queryOptions.sortBy = this.query.sortBy;
    this.queryOptions.isSortAscending = this.query.isSortAscending;

    // Filter logic
    if (this.query.vehiclemakeid) {
      this.queryOptions.filter = this.query.vehiclemakeid;
    } else {
      this.queryOptions.filter = null;
    }

    // Service call to retrieve vehicles from backend
    this.vehicleTestService
      .list(this.queryOptions)
      .subscribe(vehicles => (this.vehicles = vehicles));
  }

  /**
   * After dropdown is changed onFilterChange() is activated.
   * New query is created and service queries backend again
   * to retrieve filtered data only.
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
