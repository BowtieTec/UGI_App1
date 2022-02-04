export class CompaniesModel {
  id?: string = '';
  name: string = '';
  place: string = '';
  parking?: any;
  status: boolean = false;
  created_at?: Date = new Date();
}
