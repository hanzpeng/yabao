import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-test',
  templateUrl: './date-test.component.html',
  styleUrls: ['./date-test.component.scss']
})
export class DateTestComponent implements AfterViewInit {
  @ViewChild("grid") grid: ElementRef;
  ngAfterViewInit() {
    this.addRow(
      "new Date()",
      new Date()
    );

    this.addRow(
      "((new Date()).valueOf() + 24 * 3600 * 1000)",
      new Date((new Date()).valueOf() + 24 * 3600 * 1000)
    );

    this.addRow(
      "new Date('2019-08-21T11:30:00-06:00')",
      new Date("2019-08-21T11:30:00-06:00")
    );

    this.addRow(
      "new Date(2019, 0, 2, 11, 30, 25, 10)",
      new Date(2019, 0, 2, 11, 30, 25, 10)
    );
  }

  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
}
