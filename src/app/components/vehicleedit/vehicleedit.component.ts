import { inject } from '@angular/core/testing';
import { VehiclemakeService } from '../../services/vehiclemake.service';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicleedit',
  templateUrl: './vehicleedit.component.html',
  styleUrls: ['./vehicleedit.component.css']
})
export class VehicleeditComponent implements OnInit {
  defaultValue: any;
  vehicleMakes: any[];
  vehicleModels: any[];
  vehicle: any = {};
  values: any = {};
  putObject: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleMakeService: VehiclemakeService,
    private vehicleService: VehicleService
  ) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }
  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
      this.vehicle = v;
      this.vehicle.vehiclemakeid = this.vehicle.vehicleMakeId;
    });

    this.vehicleMakeService.getVehicleMakes().subscribe(vehicleMakes => {
      this.vehicleMakes = vehicleMakes;
      console.log('Vehicle Makes', this.vehicleMakes);
    });
  }

  submit() {
    this.putObject.id = this.vehicle.id;
    this.putObject.owneremail = this.vehicle.owneremail;
    this.putObject.vehiclemodelid = 2;
    this.putObject.vehiclemakeid = 1;
    this.vehicleService.update(this.putObject).subscribe(x => console.log(x));
  }

  onVehicleMakeChange() {
    let selectedVehicleMake = this.vehicleMakes.find(
      m => m.id == this.vehicle.vehiclemakeid
    );
    this.vehicleModels = selectedVehicleMake.vehicleModels;
    console.log('Vehicle', this.vehicle);
  }

  onVehicleModelChange() {
    console.log('Vehicle', this.vehicle);
  }
  delete(vehicle) {
    if (confirm('Vehicle will be permanently deleted! Are you sure?')) {
      this.vehicleService.delete(vehicle.id).subscribe(x => console.log(x));
    }
  }
}
