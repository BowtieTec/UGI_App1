// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const Ip = 'localhost';
const Port = '3001';
export const environment = {
  production: false,
  serverAPI: `http://${Ip}:${Port}/v1/`,
  secretKey: '3%UC!C$WR7m$v^as@Sq8$4!^Mb25WS4i',
  leftMenu: [
    {
      path: '/home',
      module: 'home',
      description: '',
      isShow: false,
    },
    {
      path: '/home/dashboard',
      module: 'dashboard',
      description: 'Dashboard',
      icon: 'fa-tachometer-alt',
      isShow: true,
    },
    {
      path: '/home/management',
      module: 'management',
      description: 'Administración',
      icon: 'fa-chart-line',
      isShow: true,
    },
    {
      path: '/home/courtesy',
      module: 'courtesy',
      description: 'Cortesías',
      icon: 'fa-calendar-check',
      isShow: true,
    },
    {
      path: '/home/parked',
      module: 'parking',
      description: 'Parqueos',
      icon: 'fa-parked',
      isShow: true,
    },
    {
      path: '#',
      module: 'reports',
      description: 'Reportes',
      icon: 'fa-chart-pie',
      isShow: true,
    },
    {
      path: '#',
      module: 'billing',
      description: 'Cuentas por pagar',
      icon: 'fa-money-bill',
      isShow: true,
    },
    {
      path: '#',
      module: 'marketing',
      description: 'Publicidad',
      icon: 'fa-puzzle-piece',
      isShow: true,
    },
    {
      path: '#',
      module: 'tests',
      description: 'Prueba de tarifa',
      icon: 'fa-hourglass-half',
      isShow: true,
    },
    {
      path: '#',
      module: 'incidents',
      description: 'Incidentes',
      icon: 'fa-exclamation-circle',
      isShow: true,
    },
  ],
  assignRole: 'assignRole',
  deleteUser: 'deleteUser',
  editUser: 'editUser',
  listParking: 'listParking',
  listUser: 'listUser',
  listCourtesy: 'listCourtesy',
  downloadCourtesy: 'downloadCourtesy',
  deleteRole: 'deleteRole',
  createParking: 'createParking',
  createCourtesy: 'createCourtesy',
  createUser: 'createUser',
  listAntennas: 'listAntennas',
  createAntennas: 'createAntennas',
  deleteAntennas: 'deleteAntennas',
  editAntennas: 'editAntennas',
  downloadQRAntenna: 'downloadQRAntenna',
  listMonthlyParking: 'listMonthlyParking',
  createMonthlyParking: 'createMonthlyParking',
  deleteMonthlyParking: 'deleteMonthlyParking',
  cancelMonthlyParking: 'cancelMonthlyParking',
  disableMonthlyParking: 'disableMonthlyParking',
  createAccessProfileMonthlyParking: 'createAccessProfileMonthlyParking',

  listParkedParking: 'listParkedParking',
  getOutWithPaymentDoneParkedParking: 'getOutWithPaymentDoneParkedParking',
  getOutWithoutPaymentDoneParkedParking:
    'getOutWithoutPaymentDoneParkedParking',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
