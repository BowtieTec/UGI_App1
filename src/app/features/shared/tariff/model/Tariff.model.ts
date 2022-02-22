export class RuleModel {
  conditions?: Conditions
  event?: Event
}

export class Conditions {
  all?: All[] = []
  any?: Any[]
}

export class All {
  fact?: string
  operator?: string
  path?: string
  value?: string | number | Date
  any?: Any[]
}

export class Any {
  fact?: string
  operator?: string
  value?: number
  path?: string
  all?: All[]
}

export class Event {
  type?: string
  params?: Params
}

export class Params {
  value?: number
  path?: number | string
}
