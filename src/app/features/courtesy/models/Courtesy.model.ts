export class CourtesyTypeModel {
  id: number = 0;
  description: string = '';
}

export class CourtesyModel {
  id?: string = '';
  parkingId: string = '';
  quantity: number = 0;
  value: number = 0;
  type: number = 0;
  name?: string = '';
  company?: CompanyModel = new CompanyModel();
  companyId?: string = '';
}

class CompanyModel {
  id: string = '';
  name: string = '';
}
