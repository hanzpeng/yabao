import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

enum Color{
  Red,
  Green,
  Blue,
}

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
    this.testsEnumConversion();
  }
  @ViewChild("grid") grid: ElementRef;
  addRow(label: string, value: any) {
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }

  testsEnumConversion() {
    const red = Color.Red;
    this.addRow("Color.Red",Color.Red);
    this.addRow("Color.Green",Color.Green);
    this.addRow("Color.Blue",Color.Blue);
    this.addRow("Color['Red']", Color['Red']);
    this.addRow("Color['Blue']", Color['Blue']);
    this.addRow("Color[Color.Blue]", Color[Color.Blue]);
    this.addRow("Color[2]", Color[2]);
    this.addRow("Color.Blue", Color.Blue);
  }

  testAsignWithOr(){
    //Test ||
    this.addRow("||", "");
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
