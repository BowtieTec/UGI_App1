export class CourtesyTypeModel {
  id = 0
  description = ''
}

export class CourtesyModel {
  id?: string = ''
  parkingId = ''
  quantity = 0
  value = 0
  type = 0
  name?: string = ''
  company?: CompanyModel = new CompanyModel()
  companyId?: string = ''
}

class CompanyModel {
  id = ''
  name = ''
}
