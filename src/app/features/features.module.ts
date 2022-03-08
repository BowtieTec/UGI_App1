import { NgModule } from '@angular/core'
import { AuthModule } from './auth/auth.module'
import { FeaturesRoutingModule } from './features-routing.module'
import { SharedModule } from '../shared/shared.module'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TariffGeneralDataComponent } from './shared/tariff/components/tariff-general-data/tariff-general-data.component'
import { PrincipalScheduleComponent } from './shared/tariff/components/principal-schedule/principal-schedule.component'
import { DaysOfWeekComponent } from './shared/tariff/components/days-of-week/days-of-week.component'
import { TariffRanksComponent } from './shared/tariff/components/tariff-ranks/tariff-ranks.component'
import { HolidayTariffFormComponent } from './shared/tariff/components/settings/holiday-tariff-form/holiday-tariff-form.component'
import { BlocksTariffFormComponent } from './shared/tariff/components/settings/blocks-tariff-form/blocks-tariff-form.component'
import { ScheduleRanksTariffFormComponent } from './shared/tariff/components/settings/schedule-ranks-tariff-form/schedule-ranks-tariff-form.component'
import { HourHalfCostComponent } from './shared/tariff/components/costs/hour-half-cost/hour-half-cost.component'
import { FixedCostComponent } from './shared/tariff/components/costs/fixed-cost/fixed-cost.component'

@NgModule({
  declarations: [
    TariffGeneralDataComponent,
    PrincipalScheduleComponent,
    DaysOfWeekComponent,
    TariffRanksComponent,
    HolidayTariffFormComponent,
    BlocksTariffFormComponent,
    ScheduleRanksTariffFormComponent,
    HourHalfCostComponent,
    FixedCostComponent
  ],
  exports: [
    TariffGeneralDataComponent,
    PrincipalScheduleComponent,
    DaysOfWeekComponent,
    TariffRanksComponent,
    HolidayTariffFormComponent,
    ScheduleRanksTariffFormComponent,
    BlocksTariffFormComponent,
    HourHalfCostComponent,
    FixedCostComponent
  ],
  imports: [
    AuthModule,
    FeaturesRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule {}
