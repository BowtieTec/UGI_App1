import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { GoogleMapsModule } from '@angular/google-maps'
import { GlobalErrorHandler } from './core/interceptos/error-interceptor.service'
import { AuthInterceptorService } from './core/interceptos/auth-interceptor.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DataTablesModule } from 'angular-datatables'
import { SharedModule } from './shared/shared.module'
import { CurrencyPipe } from '@angular/common'
import { RegisterPublicFormComponent } from './register-public-form/register-public-form.component'
import { ParkingModule } from './features/parking/parking.module'
import { FileUploadModule } from './register-public-form/components/file-upload.module'

@NgModule({
  declarations: [AppComponent, RegisterPublicFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    NgbModule,
    DataTablesModule,
    SharedModule,
    ParkingModule,
    FileUploadModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: CurrencyPipe }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
