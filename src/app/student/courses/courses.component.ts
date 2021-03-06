import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Student } from "../../core/models/student";
import { ApiService } from "../../core/services/api.service";
import { BehaviorSubject, throwError } from 'rxjs';
import { MatTableColumnDefinition, MatTableConfig, MatTableOptions } from '../../core/components/custom-mat-table/custom-mat-table.component';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {

  constructor(private studentApiService: ApiService) { }
  title = 'Student Courses';
  students: Student[] = [];
  dataSource = new MatTableDataSource<Student>();
  dataSubject = new BehaviorSubject<Student[]>([]);
  loaded = new BehaviorSubject<boolean>(false);
  @ViewChild("requestAttentionTemplate", { read: TemplateRef }) requestAttentionTemplate: TemplateRef<any>;


  public displayedColumns = ['fullNameDef', 'checkShieldDef', 'firstNameDef', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course'];

  matTableOptions: MatTableOptions
  getMatTableOptions(): MatTableOptions {
    let options: MatTableOptions = {
      records: this.dataSubject,
      columns: [
        new MatTableColumnDefinition({ name: "", value: "requestAttentionDef", templateRef: this.requestAttentionTemplate }),
        new MatTableColumnDefinition({ name: "First Name", value: "firstName", binding: "firstName" }),
        new MatTableColumnDefinition({ name: "Email", value: "email", binding: "studentEmail" }),
      ],
      config: new MatTableConfig({
        sortBy: "firstName",
        sortDirection: "asc",
        pageSize: 10,
        showSelectCheckbox: true,
        showSelectAll: true,
        clientSortPage: true,
      })
    }

    return options;
  }

  ngOnInit(): void {
    // alert("Error Happend");
  }

  ngAfterViewInit(): void {
    this.matTableOptions = this.getMatTableOptions();
    this.getStudentsInformation();
  }

  getStudentsInformation() {
    this.studentApiService.getStudentsInformation().pipe(
      map(
        (students: Student[]) => {
          //students.splice(1, 3);
          if (students.length > 10) {
            // return students;
            throw new Error('Valid token not returned');
          } else {
            return students;
          }
        }
      ),
      map(
        (students: any) => { return students; }
      ),
      map(
        (students: any) => { return students; }
      ),
    )
      .subscribe(
        (res) => {
          console.log(res);
          this.dataSource.data = res;
          this.dataSubject.next(res);
          this.students = res;
          this.loaded.next(true);
        },
        error => {
          alert("Error Happend:" + error );
        })
  }

  showShield(student: Student): boolean {
    return true;
  }

  getShieldClass(student: Student): string {
    if (student.yearOfStudy > 2)
      return 'error-shield';
    else
      return 'warning-shield';
  }

  getTooltip(student: Student): string {
    return student.firstName + " has error";
  }
}
