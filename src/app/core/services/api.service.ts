import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient ) {  }
  getStudentsInformation(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseURL}students.json`);
  }
}
