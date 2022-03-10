import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FileUploadComponent } from './file-upload/file-upload.component'

@NgModule({
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class FileUploadModule {}
