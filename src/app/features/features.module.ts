import { NgModule } from '@angular/core'
import { AuthModule } from './auth/auth.module'
import { FeaturesRoutingModule } from './features-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [],
  imports: [AuthModule, FeaturesRoutingModule, SharedModule]
})
export class FeaturesModule {}
