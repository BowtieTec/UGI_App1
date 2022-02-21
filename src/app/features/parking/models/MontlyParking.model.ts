export class MonthlyUserModel {
  id = ''
  name = ''
  last_name = ''
  email = ''
  phone_number = ''
}

export class ProfilesModel {
  id = 0
  name = ''
  deleted = 0
}

export class SubscriptionModel {
  id = ''
  begin_date = ''
  finish_date = ''
  deleted = 0
  isUnlimited = 1
  status = 1
  amount = 400
  user: SubscriptionUserModel | null = null
  profile_subscription: null | SubscriptionUserModel = null
}

export class SubscriptionProfileModel {
  id = ''
  name = ''
  deleted = ''
}

export class SubscriptionUserModel {
  id = ''
  name = ''
  last_name = ''
  email = ''
  phone_number = ''
}

export class GetStationModel {
  id?: string = ''
  type = 0
  name = ''
  antena = ''
  mac = ''
  isPrivate = false
  addStation?: boolean = false
}

export class CreateProfilesModel {
  parkingId = ''
  name = ''
  stations: IdModel[] = []
}

export class IdModel {
  id = ''
}
