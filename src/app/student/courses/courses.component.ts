import { Component, OnInit } from '@angular/core';
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
  public displayedColumns = ['fullNameDef', 'checkShieldDef','firstNameDef', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course'];
  get matTableOptions(): MatTableOptions {
    let options: MatTableOptions = {
      records: this.dataSubject,
      columns: [
        new MatTableColumnDefinition({ name: "Full Name", value: "fullNameDef", binding: ""}),
        new MatTableColumnDefinition({ name: "Student Email", value: "emailDef", binding: "studentEmail"}),
      ],
      config: new MatTableConfig({
        sortBy: "fullNameDef",
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

}
