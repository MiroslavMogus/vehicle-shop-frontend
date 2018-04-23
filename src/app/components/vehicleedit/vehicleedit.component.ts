import { VehicleTestService } from "../../services/vehicletest.service";
import {
  Vehicle,
  SaveVehicle,
  VehicleMake,
  VehicleModel
} from "./../../models/vehicle";
import { inject } from "@angular/core/testing";
import { VehicleMakeService } from "../../services/vehiclemake.service";
import { VehicleService } from "../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-vehicleedit",
  templateUrl: "./vehicleedit.component.html",
  styleUrls: ["./vehicleedit.component.css"]
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle;
  models: any[];
  makes: any[];
  vehicleModels: VehicleModel = {
    id: 0,
    name: ""
  };
  vehicleMakes: VehicleMake = {
    id: 0,
    name: "",
    vehicleModel: this.vehicleModels
  };
  vehicleToSave: SaveVehicle = {
    id: 0,
    vehiclemakeid: 1,
    vehiclemodelid: 0,
    vehicleModelId: 0,
    owneremail: "",
    ownerEmail: "",
    vehicleMakeId: 0,
    vehicleMake: this.vehicleMakes
  };

  submitObject: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleMakeService: VehicleMakeService,
    private vehicleService: VehicleService,
    private vehicleTestService: VehicleTestService
  ) {
    route.params.subscribe(p => {
      this.vehicleToSave.id = +p["id"];
    });
  }

  /**
   * Loading of vehicles and vehicle makes.
   */
  ngOnInit() {

    this.vehicleService.getVehicle(this.vehicleToSave.id).subscribe(v => {
      this.vehicleToSave = v;
      this.setSelected();
    });

    this.vehicleMakeService.getVehicleMakes().subscribe(makes => {
      this.makes = makes;
      this.vehicleToSave.vehicleMake = this.makes.find(
        m => m.id == this.vehicleToSave.vehiclemakeid
      );
    });

  }

  setSelected() {
    this.vehicleService.getVehicle(this.vehicleToSave.id).subscribe(v => {
      this.vehicleToSave = v;
      this.vehicleToSave.vehiclemakeid = this.vehicleToSave.vehicleMakeId;
      this.vehicleToSave.vehiclemodelid = this.vehicleToSave.vehicleModelId;
      this.vehicleToSave.owneremail = this.vehicleToSave.ownerEmail;
      this.onVehicleMakeChange();
    });
  }

  /**
   * submitObject is used to send only required data
   * from form to backend for saving to database.
   */
  async submit() {
    this.submitObject.id = this.vehicleToSave.id;
    this.submitObject.owneremail = this.vehicleToSave.owneremail;
    this.submitObject.vehiclemodelid = this.vehicleToSave.vehicleModelId;
    this.submitObject.vehiclemakeid = this.vehicleToSave.vehicleMakeId;
    await this.vehicleTestService
      .update(this.submitObject)
      .subscribe(vehicle => {
        this.vehicle = vehicle;
        this.router.navigate(["/vehicles/"]);
      });
  }

  /**
   * Dropdown change is detected here and vehicle makes are populated
   * with associated models.
   */
  onVehicleMakeChange() {
    if (this.vehicleToSave.vehiclemakeid) {
    var selectedMake = this.makes.find(
      m => m.id == this.vehicleToSave.vehiclemakeid
    );
  }
    this.models = selectedMake ? selectedMake.vehicleModels : [];
    this.vehicleToSave.vehicleMakeId = selectedMake.id;
    //this.vehicle.vehicleModelId = ;
  }

  /**
   * Dropdown change is detected here and vehicle models are populated
   * with associated vehicle makes.
   */
  onVehicleModelChange() {
    var selectedModel = this.models.find(
      m => m.id == this.vehicleToSave.vehiclemodelid
    );
    this.vehicleToSave.vehicleModelId = selectedModel.id;
  }

  onVehicleEmailChange() {}

  /**
   * Delete button logic is executed here and vehicle is deleted
   * according to vehicle id.
   */
  delete(vehicle) {
    if (confirm("Vehicle will be permanently deleted! Are you sure?")) {
      this.vehicleTestService.delete(vehicle.id).subscribe();
    }
  }
}
