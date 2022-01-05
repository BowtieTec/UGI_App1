export class StationsCourtesyModel {
  id: string = '';
  name: string = '';
  mac: string = '';
  antena: string = '';
  status?: number;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  courtesy_detail?: CourtesyDetail | null;
}

export interface CourtesyDetail {
  id: string;
  name: string;
  quantity: number;
  type: number;
  value: number;
  haveStation: number;
  created_at: Date;
  updated_at: Date;
}

export class CreateStation {
  name: string = '';
  parking: string = '';
  antena: string = '';
  mac: string = '';
}
