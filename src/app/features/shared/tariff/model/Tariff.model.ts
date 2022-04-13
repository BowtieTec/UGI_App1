import { ParkingModel } from '../../../parking/models/Parking.model'

export class RuleModel {
  conditions?: Conditions
  event?: Event
}

export class HourHalfInputModel {
  static_descriptionCost = ''
  costHour = 0
  costAHalf = 0
  whenIsAHalf = 0
}

export class FixedCostInputModel {
  static_descriptionCost = ''
  fixedCost = 0
}

export class RuleModelSaved {
  rules?: Array<Rules> = []
  parking?: ParkingModel = new ParkingModel()
  description?: string
  id?: string
}

export class Rules {
  conditions: Conditions = new Conditions()
  event: Event = new Event()
}

export class Conditions {
  all: All[] = []
  any?: Any[]
}

export class All implements ICondition {
  fact = ''
  operator = ''
  path?: string
  value?: string | number | Date | number[]
  any?: Any[]
}

export class Any implements ICondition {
  fact = ''
  operator = ''
  value = 0
  path?: string
  all?: All[]
}

export class Event implements IEvent {
  type?: string = ''
  params?: IParam[] | IParamsParams
}

export class Params implements IParamParams {
  value?: number
  path?: number | string
}

export interface ICondition {
  fact: string
  operator: string
  path?: string
  value?: string | number | Date | number[]
}

export interface IEvent {
  type?: string
  params?: IParam[] | IParamsParams
}

export interface IParam {
  type?: string
  params?: IParamParams
}

export interface IParamParams {
  value?: number
  path?: number | string
}

export interface IParamsParams {
  value?: number
  path?: number
}
