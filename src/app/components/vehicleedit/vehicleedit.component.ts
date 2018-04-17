import { Vehicle, SaveVehicle, VehicleMake, VehicleModel } from './../../models/vehicle';
import { inject } from '@angular/core/testing';
import { VehicleMakeService } from '../../services/vehiclemake.service';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicleedit',
  templateUrl: './vehicleedit.component.html',
  styleUrls: ['./vehicleedit.component.css']
})
export class VehicleEditComponent implements OnInit {
  models: any[];
  makes: any[];
  vehicleModels: VehicleModel = {
    id: 0,
    name: ''
  };
  vehicleMakes: VehicleMake = {
    id: 0,
    name: '',
    vehicleModel: this.vehicleModels
  };
  vehicle: SaveVehicle = {
    id: 0,
    vehiclemakeid: 0,
    vehiclemodelid: 0,
    vehicleModelId: 0,
    owneremail: '',
    ownerEmail: '',
    vehicleMakeId: 0,
    vehicleMake: this.vehicleMakes
  };

  submitObject: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleMakeService: VehicleMakeService,
    private vehicleService: VehicleService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

/**
 * Loading of vehicles and vehicle makes.
 */
  ngOnInit() {
      this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
      this.vehicle = v;
    });
      this.vehicleMakeService.getVehicleMakes().subscribe(makes => {
      this.makes = makes;
      this.vehicle.vehicleMake = this.makes.find(m => m.id == this.vehicle.vehiclemakeid);
    });
    this.initValues();
  }

  initValues() {
    this.vehicle.vehiclemakeid = this.vehicle.vehicleMakeId;
  }

/**
 * submitObject is used to send only required data
 * from form to backend for saving to database.
 */
  async submit() {
    this.submitObject.id = this.vehicle.id;
    this.submitObject.owneremail = this.vehicle.owneremail;
    this.submitObject.vehiclemodelid = this.vehicle.vehicleModelId;
    this.submitObject.vehiclemakeid = this.vehicle.vehicleMakeId;
    await this.vehicleService.update(this.submitObject).subscribe(
      vehicle => {
        this.vehicle = vehicle;
        this.router.navigate(['/vehicles/']);
      });
  }

/**
 * Dropdown change is detected here and vehicle makes are populated
 * with associated models.
 */
  onVehicleMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.vehiclemakeid);
    this.models = selectedMake ? selectedMake.vehicleModels : [];
    this.vehicle.vehicleMakeId = selectedMake.id;
    //this.vehicle.vehicleModelId = ;
  }

/**
 * Dropdown change is detected here and vehicle models are populated
 * with associated vehicle makes.
 */
  onVehicleModelChange() {
    var selectedModel = this.models.find(m => m.id == this.vehicle.vehiclemodelid);
    this.vehicle.vehicleModelId = selectedModel.id;
  }

  onVehicleEmailChange() {
  }

/**
 * Delete button logic is executed here and vehicle is deleted
 * according to vehicle id.
 */
  delete(vehicle) {
    if (confirm('Vehicle will be permanently deleted! Are you sure?')) {
      this.vehicleService.delete(vehicle.id).subscribe();
    }
  }
}
