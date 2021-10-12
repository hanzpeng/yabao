import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-date-test',
  templateUrl: './date-test.component.html',
  styleUrls: ['./date-test.component.scss']
})

export class DateTestComponent implements AfterViewInit {
  @ViewChild("grid") grid: ElementRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngAfterViewInit() {
    let now = new Date();
    let tomorrow = new Date(now.valueOf() + 24*3600*1000);

    this.addRow(
      "now",
      "new Date()"
    );

    this.addRow(
      "tomorrow",
      "new Date(now.valueOf() + 24*3600*1000)"
    );

    this.addRow(
      "tomorrow",
      tomorrow
    );

    this.addRow(
      "now.toISOString()",
      now.toISOString()
    );

    this.addRow(
      `new Date(${now.toISOString()})`,
      new Date(now.toISOString())
    );

    this.addRow(
      "now.toUTCString()",
      now.toUTCString()
    );

    this.addRow(
      "now",
      now
    );

    this.addRow(
      "now.toString()",
      now.toString()
    );

    this.addRow(
      "now.toLocaleString()",
      now.toLocaleString()
    );

    this.addRow(
      "now.toLocaleDateString()",
      now.toLocaleDateString()
    );

    this.addRow(
      "now.toLocaleTimeString()",
      now.toLocaleTimeString()
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US")',
      tomorrow.toLocaleString("en-US")
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US",{timeZone: "America/Los_Angeles"})',
      tomorrow.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    );

    this.addRow(
      'tomorrow.toLocaleString("en-US",{timeZone: "America/New_York"})',
      tomorrow.toLocaleString("en-US", {timeZone: "America/New_York"})
    );

    this.addRow(
      'tomorrow.toLocaleString("en-AU")',
      tomorrow.toLocaleString("en-AU")
    );

    this.addRow(
      'tomorrow.toLocaleString("zh")',
      tomorrow.toLocaleString("zh")
    );

    this.addRow(
      "now.valueOf() + 24 * 3600 * 1000)",
      now.valueOf() + 24 * 3600 * 1000
    );

    this.addRow(
      "new Date('2019-08-21T11:30:00-06:00')",
      new Date("2019-08-21T11:30:00-06:00")
    );

    this.addRow(
      "new Date(2019, 0, 2, 11, 30, 25, 10)",
      new Date(2019, 0, 2, 11, 30, 25, 10)
    );

    this.addRow(
      "JSON.stringify({mydate: tomorrow})",
      JSON.stringify({mydate: tomorrow})
    );

    this.addRow(
      "typeof now",
      typeof now
    );

  }

  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
}
