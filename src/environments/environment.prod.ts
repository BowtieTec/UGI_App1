import { DiscountOnWhat, leftMenu, permission, settings, TypeOfCondition } from './sharedVariables'

const Ip = 'app.bowtietech.pro'
const Port = '3000'
export const environment = {
  production: true,
  serverAPI: `https://${Ip}:${Port}/v1/`,
  secretKey: 'N6fL57vA^5ZGP$qHJ!6gQ5#!5VijE@6We%NjJ',
  DiscountOnWhat,
  TypeOfCondition,
  leftMenu: leftMenu,
  ...permission,
  settings
}
