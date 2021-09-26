import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { CoursesComponent } from './courses/courses.component';



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule, CoreModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class StudentModule { }
