
export interface Vehicle {
    vehiclemakeid: number;
    vehiclemodelid: number;
    owneremail: string;
}

export interface SaveVehicle {
    id: number;
    vehiclemakeid: number;
    vehicleMakeId: number;
    vehiclemodelid: number;
    vehicleModelId: number;
    vehicleMake: VehicleMake;
    owneremail: string;
    ownerEmail: string;
}

export interface VehicleMake {
    id: number;
    vehicleModel: VehicleModel;
    name: string;
}

export interface VehicleModel {
    id: number;
    name: string;
}



