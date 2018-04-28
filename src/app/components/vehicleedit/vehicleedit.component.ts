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
  models: any[];
  makes: any[];
  submitObject: any = {};

  vehicleModels = new VehicleModel();
  vehicleMakes = new VehicleMake();
  vehicleToSave = new SaveVehicle();
  vehicle = new Vehicle();
  selectedMakeId: number;

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

    // Received vehicle with specific id here
    this.vehicleTestService.read(this.vehicleToSave.id).subscribe(v => {
      this.vehicleToSave = v;
      this.selectedMakeId = this.vehicleToSave.vehiclemakeid;

      // Loading of vehiclemakes
      this.getVehicleMakes();
    });
  }

  /**
   * Loading of vehicle makes from backend.
   */
  getVehicleMakes() {
    this.vehicleMakeService.getVehicleMakes().subscribe(makes => {
      this.makes = makes;

      this.setSelected();
    });
  }

  async setSelected() {
    // This is vehicleMake for specific vehicle
    if (this.vehicleToSave.vehiclemakeid !== undefined) {
      var selectedMake = this.makes.find(
        m => m.id === this.vehicleToSave.vehiclemakeid
      );

      // This is example output
      // console.log(this.vehicleToSave.vehicleMake);
      // {id: 1, name: "Mercedes", vehicleModels: Array(2)}

      // console.log(this.vehicleToSave.vehiclemodelid);
      // 3

      this.models = selectedMake ? selectedMake.vehicleModels : [];
  }
}

  /**
   * submitObject is used to send only required data
   * from form to backend for saving to database.
   */
  async submit() {
    this.submitObject.id = this.vehicleToSave.id;
    this.submitObject.owneremail = this.vehicleToSave.owneremail;
    this.submitObject.vehiclemodelid = this.vehicleToSave.vehiclemodelid;
    this.submitObject.vehiclemakeid = this.vehicleToSave.vehiclemakeid;
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
  async onVehicleMakeChange() {

    this.selectedMakeId = this.vehicleToSave.vehiclemakeid;
    console.log(this.selectedMakeId);

    this.vehicleMakeService.getVehicleMakes().subscribe(makes => {
      this.makes = makes;


        let selectedMake = this.makes.find(m => m.id == this.selectedMakeId);

        console.log(selectedMake);
        this.models = selectedMake ? selectedMake.vehicleModels : [];

    });

  }

  /**
   * Dropdown change is detected here and vehicle models are populated
   * with associated vehicle makes.
   */
  async onVehicleModelChange() {
    var selectedModel = await this.models.find(
      m => m.id == this.vehicleToSave.vehiclemodelid
    );
    this.vehicleToSave.vehicleModelId = selectedModel.id;
  }

  onVehicleEmailChange() {}

  /**
   * Delete button logic is executed here and vehicle is deleted
   * according to vehicle id.
   */
  async delete(vehicle) {
    if (confirm("Vehicle will be permanently deleted! Are you sure?")) {
      await this.vehicleTestService
        .delete(vehicle.id)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe(vehicle => {
          this.vehicle = vehicle;
          this.router.navigate(["/vehicles/"]);
        });
    }
  }
}
