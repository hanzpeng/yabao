import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-type-script',
  templateUrl: './type-script.component.html',
  styleUrls: ['./type-script.component.scss']
})
export class TypeScriptComponent implements OnInit, AfterViewInit {
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tests();
  }
  @ViewChild("grid") grid: ElementRef;
  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }
  tests() {
    this.addRow("expression", "value");
    this.getSafetyOrientationStatus("MWH","hanz", new Date());
    this.getSafetyOrientationStatus("MWH","hanz");
    let name;
    this.getSafetyOrientationStatus("MWH",name);
  }

  getSafetyOrientationStatus(datacenterId: string, userId: string, endedAt?: Date): void {
    const searchQueryParams = {
      datacenterId: datacenterId || null,
      userId: userId || null,
      endedAt: endedAt || null
    };
    this.addRow(`datacenterId: ${datacenterId}, userId: ${userId}, endedAt: ${ endedAt }`, JSON.stringify(searchQueryParams));
  }
}
