import { Resource } from './resource';

export class Vehicle extends Resource {
    vehiclemakeid: number;
    vehiclemodelid: number;
    owneremail: string;
    ownerEmail: string;
    vehicleMakeId: number;
    vehicleModelId: number;
    vehicleMake: VehicleMake;
    vehicleModel: VehicleModel;
}

export class SaveVehicle {
    id: number;
    vehiclemakeid: number;
    vehicleMakeId: number;
    vehiclemodelid: number;
    vehicleModelId: number;
    vehicleMake: VehicleMake;
    vehicleModel: VehicleModel;
    owneremail: string;
    ownerEmail: string;

    constructor() {
        this.id = 1;
      }
}

export class VehicleMake {
    id: number;
    vehicleModel: VehicleModel;
    name: string;
}

export class VehicleModel {
    id: number;
    name: string;
}



