export class StationsCourtesyModel {
  id: string = '';
  name: string = '';
  mac: string = '';
  antena: string = '';
  status?: number;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  courtesy_detail?: CourtesyDetail = new CourtesyDetail();
}

export class CourtesyDetail {
  id: string = '';
  name: string = '';
  quantity: number = 0;
  type: number = 0;
  value: number = 0;
  company?: CompanyModel = new CompanyModel();
  haveStation: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
}

class CompanyModel {
  id: string = '';
  name: string = '';
}

export class CreateStation {
  name: string = '';
  parking: string = '';
  antena: string = '';
  mac: string = '';
}

export class CreateStationaryCourtesy {
  parkingId: string = '';
  value: number = 0;
  type: number = 0;
  name: string = '';
  stationId: string = '';
}
