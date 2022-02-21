import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../shared/shared.module'
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UsersRoutingModule, SharedModule]
})
export class UsersModule {}
