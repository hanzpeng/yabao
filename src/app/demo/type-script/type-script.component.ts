import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

enum Color {
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
    // this.testsEnumConversion();
    // this.testAsignWithOr();
    // this.testMapDefault();
    //this.testMapForEach();
    this.testRegex();
  }
  @ViewChild("grid") grid: ElementRef;
  add(label: string, value?: any) {
    if (!value) {
      value = "";
    }
    this.grid.nativeElement.innerHTML += `<div>${label}</div><div>${value}</div>`
  }

  testMapDefault() {
    const map = new Map<string, string>();
    map.set("a", "AAA");
    map.set("b", "BB");
    this.add("a", map.get("a"));
    this.add("c", map.get("c"));
    this.add("d", null);
    this.add("c", !!map.get("c"));
    this.add("d", !!map.get("d"));
    map.forEach((value, key) => {
      this.add(key, value);
    })
  }

  testMapForEach() {
    const map = new Map<string, string>();
    map.set("a", "AAA");
    map.set("b", "BB");
    map.set("c", null);
    // this does not work
    this.add(map["a"]);
    this.add(map.get("a"));
    //this does not work
    map["a"] = "SSS";
    this.add(map.get("a"));

    map.forEach((value, key) => {
      this.add(key, value);
    });
    map.forEach((value) => {
      if (!!value) {
        this.add("", value);
      }
    });
    map.forEach((vaule, key) => {
      this.add("key1", key);
    })

    map.size;
    this.add("map.size", map.size)

    for (let id of map) {
      this.add(id.toString());
    }

    map.forEach((vaule: string, key: string) => {
      this.add(key);
    });
  }

  testsEnumConversion() {
    const red = Color.Red;
    this.add("Color.Red", Color.Red);
    this.add("Color.Green", Color.Green);
    this.add("Color.Blue", Color.Blue);
    this.add("Color['Red']", Color['Red']);
    this.add("Color['Blue']", Color['Blue']);
    this.add("Color[Color.Blue]", Color[Color.Blue]);
    this.add("Color[2]", Color[2]);
    this.add("Color.Blue", Color.Blue);
  }

  testAsignWithOr() {
    //Test ||
    this.add("||", "");
    this.getSafetyOrientationStatus("MWH", "hanz", new Date());
    this.getSafetyOrientationStatus("MWH", "hanz");
    let name;
    this.getSafetyOrientationStatus("MWH", name);
  }

  getSafetyOrientationStatus(datacenterId: string, userId: string, endedAt?: Date): void {
    const searchQueryParams = {
      datacenterId: datacenterId || null,
      userId: userId || null,
      endedAt: endedAt || null
    };
    this.add(`datacenterId: ${datacenterId}, userId: ${userId}, endedAt: ${endedAt}`, JSON.stringify(searchQueryParams));
  }

  testRegex() {
    const email = "hanz@microsoft.com";
    const matches = email.match(/^([^@]*)@(.*)/);
    for (let x of matches) {
      this.add(x);
    }
    const alias = matches[1];
    const domain = matches[2];
    this.add("alias", alias);
    this.add("domain", domain);

  }


}
