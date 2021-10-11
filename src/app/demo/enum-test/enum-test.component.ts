import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

export enum RequestType {
  None = 0,
  Tour = 1,
  Temporary = 2,
  Permanent = 3,
  Visit = 4,
  Emergency = 5,
  Governmental = 6,
  RestrictedAccess = 7,
  SpecialPermissions = 8,
  TerminatePersons = 9
}

@Component({
  selector: 'app-enum-test',
  templateUrl: './enum-test.component.html',
  styleUrls: ['./enum-test.component.scss']
})
export class EnumTestComponent implements OnInit, AfterViewInit {

  constructor() { }
  @ViewChild("grid") grid: ElementRef;
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.displayContent();
  }

  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }

  toRequestType(x: any): RequestType {
    if(typeof x ==="string"){
      return RequestType[x];
    }else if(typeof x ==="number"){
      return <RequestType>x;
    }else{
      return RequestType.None;
    }
  }

  displayContent() {
      this.addRow("RequestType.Permanent",RequestType.Permanent);
      this.addRow('RequestType["Permanent"]',RequestType["Permanent"]);
      this.addRow('RequestType["Permanent"]',RequestType["Permanent"] === RequestType.Permanent);
      this.addRow('',this.toRequestType("Permanent"));
      this.addRow('',this.toRequestType("Permanent"));
      this.addRow('',this.toRequestType(RequestType.Permanent));
      this.addRow('',this.toRequestType(14));
      this.addRow('',this.toRequestType({x:3}));
      this.addRow('',this.toRequestType("permanent"));
  }

}
