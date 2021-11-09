const Ip = 'dev.bowtietech.pro';
const Port = '3000';
export const environment = {
  production: true,
  serverAPI: `https://${Ip}:${Port}/v1/`,
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
      path: '/home/parking',
      module: 'parking',
      description: 'Parqueos',
      icon: 'fa-parking',
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
};
