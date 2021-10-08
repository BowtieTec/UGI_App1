import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [],
  imports: [AuthModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
