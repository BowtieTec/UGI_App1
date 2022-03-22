export const permission = {
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
  changeParkingAtCreateUser: 'changeParkingAtCreateUser',
  listCourtesyStationary: 'listCourtesyStationary',
  createCourtesyStationary: 'createCourtesyStationary',
  addStationsCourtesyStationary: 'addStationsCourtesyStationary',
  graficosIngresoVehiculos: 'graficosIngresoVehiculos',
  graficosFlujoDinero: 'graficosFlujoDinero',
  graficosCortesias: 'graficosCortesias',
  verMenuPayment: 'verMenuPayment',
  verDiscuontReport: 'verDiscuontReport',
  verDurationReport: 'verDurationReport',
  verDailyParkingReport: 'verDailyParkingReport',
  verMonthlyParkingReport: 'verMonthlyParkingReport',
  verDailyParkingReportTicket: 'verDailyParkingReportTicket',
  verCourtesiesReport: 'verCourtesiesReport',
  verTodosLosParqueosDashboard: 'verTodosLosParqueosDashboard',
  verTodosLosParqueosReport: 'verTodosLosParqueosReport',
  verCourtesiesStationReport: 'verCourtesiesStationReport',
  graficosCortesiasEstacionarias: 'graficosCortesiasEstacionarias',
  listLocal: 'listLocal',
  createLocal: 'createLocal',
  disableLocal: 'disableLocal',
  editLocal: 'editLocal',

  listSchedules: 'listSchedules',
  listTariff: 'listTariff',
  tariffTest: 'tariffTest',
  newTicket: 'newTicket'
}
export const leftMenu = [
  {
    path: '/home',
    module: 'home',
    description: '',
    isShow: false
  },
  {
    path: '/home/dashboard',
    module: 'dashboard',
    description: 'Dashboard',
    icon: 'fa-tachometer-alt',
    isShow: true
  },
  {
    path: '/home/management',
    module: 'management',
    description: 'Administración',
    icon: 'fa-chart-line',
    isShow: true
  },
  {
    path: '/home/courtesy',
    module: 'courtesy',
    description: 'Cortesías',
    icon: 'fa-calendar-check',
    isShow: true
  },
  {
    path: '/home/parking',
    module: 'parking',
    description: 'Parqueos',
    icon: 'fa-parking',
    isShow: true
  },
  {
    path: '/home/report',
    module: 'report',
    description: 'Reportes',
    icon: 'fa-chart-pie',
    isShow: true
  },
  {
    path: '/home/support',
    module: 'support',
    description: 'Soporte',
    icon: 'fa-info-circle',
    isShow: true
  }
]
export const DiscountOnWhat = [
  { id: 1, name: 'Total' },
  { id: 2, name: 'Cantidad de horas' }
]
export const TypeOfCondition = [
  { id: 1, name: 'Aplicar siempre' },
  { id: 2, name: 'Solo si Cant. Horas menor a descuento' }
]
