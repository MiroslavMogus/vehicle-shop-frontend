import { Vehicle } from './vehicle';

export class VehicleSerializer {
  fromJson(json: any): Vehicle {
    const vehicle = new Vehicle();
    vehicle.id = json.id;
    vehicle.vehiclemakeid = json.vehicleMakeId;
    vehicle.vehiclemodelid = json.vehicleModelId;
    vehicle.owneremail = json.ownerEmail;
    vehicle.vehicleMake = json.vehicleMake;
    vehicle.vehicleModel = json.vehicleModel;
    return vehicle;
  }

  toJson(vehicle: Vehicle): any {
    return {
      id: vehicle.id,
      vehiclemakeid: vehicle.vehiclemakeid,
      vehiclemodelid: vehicle.vehiclemodelid,
      owneremail: vehicle.owneremail
    };
  }

}
