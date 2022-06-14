export class StationsCourtesyModel {
  id = ''
  name = ''
  mac = ''
  antena = ''
  status?: number
  created_at: Date = new Date()
  updated_at: Date = new Date()
  courtesy_detail?: CourtesyDetail = new CourtesyDetail()
}

export class CourtesyDetail {
  id = ''
  name = ''
  quantity = 0
  type = 0
  value = 0
  company?: CompanyModel = new CompanyModel()
  condition?: number
  cantHours?: number
  haveStation = 0
  created_at: Date = new Date()
  updated_at: Date = new Date()
}

class CompanyModel {
  id = ''
  name = ''
}

export class CreateStation {
  name = ''
  parking = ''
  antena = ''
  mac = ''
}

export class CreateStationaryCourtesy {
  parkingId = ''
  value = 0
  type = 0
  name = ''
  stationId = ''
  condition= 0
  companyId = 0
  cantHours = 0
  valueTimeMinutes= 0
}
