// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { leftMenu, permission } from './sharedVariables'

const Ip = 'dev.bowtietech.pro'
const Port = '3000'
export const environment = {
  production: false,
  serverAPI: `https://${Ip}:${Port}/v1/`,
  secretKey: '3%UC!C$WR7m$v^as@Sq8$4!^Mb25WS4i',
  leftMenu: leftMenu,
  ...permission
}
