export class ParkingModel {
  id: string = '';
  name: string = '';
}

export class ParkedModel {
  id: string = '';
  status: number = 0;
  type: number = 0;
  entry_date: Date = new Date();
  exit_date: Date = new Date();
  user_name: string = '';
  last_name: string = '';
  phone_number: string = '';
  parking: string = '';
}

class UserParked {
  name: string = '';
  last_name: string = '';
  phone_number: string = '';
}

class ParkingParked {
  id: string = '';
  name: string = '';
}

export const StatusParked = [
  {
    id: 1,
    name: 'Dentro del parqueo',
  },
  {
    id: 4,
    name: 'Problema con la estación',
  }

];
/*
* Add an object with
*  id: 2 for 'Fuera del parqueo'
* And
*  id: '' with name 'Todos'
* To have all entrances and exits.
*/
