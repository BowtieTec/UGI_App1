import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { share } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
})
export class UsersModule {}
