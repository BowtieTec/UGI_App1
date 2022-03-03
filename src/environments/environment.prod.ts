import { leftMenu, permission } from './sharedVariables'

const Ip = 'app.bowtietech.pro'
const Port = '3000'
export const environment = {
  production: true,
  serverAPI: `https://${Ip}:${Port}/v1/`,
  secretKey: '3%UC!C$WR7m$v^as@Sq8$4!^Mb25WS4i',
  leftMenu: leftMenu,
  ...permission
}
