import {leftMenu, permission} from "./sharedVariables";

const Ip = 'localhost';
const Port = '3001';
export const environment = {
  production: true,
  serverAPI: `http://${Ip}:${Port}/v1/`,
  secretKey: '3%UC!C$WR7m$v^as@Sq8$4!^Mb25WS4i',
  leftMenu,
  ...permission
};

