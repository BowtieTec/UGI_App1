import {ParkingModel} from "../../../../parking/models/Parking.model";

export class CompaniesModel {
  id: string = '';
  name: string = '';
  place: string = '';
  parking: ParkingModel = new ParkingModel();
  status: boolean = false;
  created_at: Date = new Date();
}
