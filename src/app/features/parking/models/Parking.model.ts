export class ParkingModel {
  id: string = '';
  name: string = '';
}

export class ParkedModel {
  parked_id: string = '';
  parked_status: number = 0;
  parked_type: number = 0;
  parked_entry_date: Date = new Date();
  parked_exit_date: Date = new Date();
  parking_id: string = '';
  parking_name: string = '';
  user_name: string = '';
  user_last_name: string = '';
  user_phone_number: string = '';
}

export const StatusParked = [
  {
    id: 0,
    name: 'Intentando entrar',
  },
  {
    id: 1,
    name: 'Dentro del parqueo',
  },
  {
    id: 3,
    name: 'Pagado',
  },
  {
    id: 4,
    name: 'Problema con la estación',
  },

];
/*
* Add an object with
*  id: 2 for 'Fuera del parqueo'
* And
*  id: '' with name 'Todos'
* To have all entrances and exits.
*/
