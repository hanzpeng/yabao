import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Student } from "../../core/models/student";
import { ApiService } from "../../core/services/api.service";
import { BehaviorSubject } from 'rxjs';
import { MatTableColumnDefinition, MatTableConfig, MatTableOptions } from '../../core/components/custom-mat-table/custom-mat-table.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private studentApiService: ApiService) { }
  title = 'Student Courses';
  student: Student[] = [];
  dataSource = new MatTableDataSource<Student>();
  dataSubject = new BehaviorSubject<Student[]>([]);
  loaded = new BehaviorSubject<boolean>(false);
  @ViewChild("requestAttentionTemplate", { read: TemplateRef }) requestAttentionTemplate: TemplateRef<any>;


  public displayedColumns = ['fullNameDef', 'checkShieldDef', 'firstNameDef', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course'];

  get matTableOptions(): MatTableOptions {
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
    this.getStudentsInformation();
  }

  getStudentsInformation() {
    this.studentApiService.getStudentsInformation()
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
        this.dataSubject.next(res);
        this.loaded.next(true);
      })
  }

  showShield(student: Student): boolean {
    return true;
  }

  getShieldClass(student:Student): string {
    if(student.yearOfStudy > 2)
    return 'error-shield';
    else
    return 'warning-shield';
  }

  getTooltip(student:Student):string{
    return student.firstName + " has error";

  }
}
