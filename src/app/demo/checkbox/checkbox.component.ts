import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/core/models/student';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  constructor(private http: HttpClient) { }
  loaded = new BehaviorSubject<boolean>(false);
  students: Student[] = [];
  selectedStudents: Student[] = [];

  ngOnInit(): void {
    let tempSubs = this.http.get<Student[]>("assets/students.json").subscribe(
      (res: Student[]) => {
        this.students = res;
        tempSubs.unsubscribe();
        this.loaded.next(true);
      },
      error => {
        alert("failed getting students");
        tempSubs.unsubscribe();
      }
    )
  }

  toggleSelected(student: Student) {
    let itemFound = false;
    this.selectedStudents.forEach((item, index) => {
      if (item == student) {
        itemFound = true;
        this.selectedStudents.splice(index, 1);
      }
    });
    if (!itemFound) {
      this.selectedStudents.push(student);
    }
  }

  isSelected(student: Student): boolean {
    return this.selectedStudents.some(item => {
      return item === student;
    });
  }

}
