import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-by-test',
  templateUrl: './order-by-test.component.html',
  styleUrls: ['./order-by-test.component.scss']
})
export class OrderByTestComponent {
  nums = [4, 2, 0, 1, 3, 5];
  nums1 = [4, 2, 0, 1, 3, 5];
  nums2 = [4, 2, 0, 1, 3, 5];
  nums3 = [4, 2, 0, 1, 3, 5];
  day = 24 * 3600 * 1000;
  now = new Date();
  dates: Array<Date> = [
    new Date(this.now.valueOf() + 4 * this.day),
    new Date(this.now.valueOf() + 2 * this.day),
    new Date(this.now.valueOf() + 0 * this.day),
    new Date(this.now.valueOf() + 1 * this.day),
    new Date(this.now.valueOf() + 3 * this.day),
    new Date(this.now.valueOf() + 5 * this.day),
  ];
  dates1: Array<Date> = [
    new Date(this.now.valueOf() + 4 * this.day),
    new Date(this.now.valueOf() + 2 * this.day),
    new Date(this.now.valueOf() + 0 * this.day),
    new Date(this.now.valueOf() + 1 * this.day),
    new Date(this.now.valueOf() + 3 * this.day),
    new Date(this.now.valueOf() + 5 * this.day),
  ];
  dates2: Array<Date> = [
    new Date(this.now.valueOf() + 4 * this.day),
    new Date(this.now.valueOf() + 2 * this.day),
    new Date(this.now.valueOf() + 0 * this.day),
    new Date(this.now.valueOf() + 1 * this.day),
    new Date(this.now.valueOf() + 3 * this.day),
    new Date(this.now.valueOf() + 5 * this.day),
  ];
  dates3: Array<Date> = [
    new Date(this.now.valueOf() + 4 * this.day),
    new Date(this.now.valueOf() + 2 * this.day),
    new Date(this.now.valueOf() + 0 * this.day),
    new Date(this.now.valueOf() + 1 * this.day),
    new Date(this.now.valueOf() + 3 * this.day),
    new Date(this.now.valueOf() + 5 * this.day),
  ];

  students1 =
    [
      {
        "firstName": "John",
        "lastName": "Doe",
        "studentEmail": "johndoe@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 2,
        "registrationNumber": "1111",
        "floor": "A"
      },
      {
        "firstName": "Alex",
        "lastName": "Smith",
        "studentEmail": "alexsmith@example.com",
        "course": "Math 101",
        "yearOfStudy": 3,
        "registrationNumber": "5555",
        "floor": "C"
      },
      {
        "firstName": "Bob",
        "lastName": "Bush",
        "studentEmail": "bobbush@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 3,
        "registrationNumber": "3333",
        "floor": "b"
      },
      {
        "firstName": "Sherry",
        "lastName": "Zhang",
        "studentEmail": "sherryzhang@example.com",
        "course": "CS101",
        "yearOfStudy": 3,
        "registrationNumber": "4444",
        "floor": "DD"
      },
      {
        "firstName": "Test2",
        "lastName": "Test2",
        "studentEmail": "test@example.com",
        "course": "Bsc Computer Science",
        "yearOfStudy": 4,
        "registrationNumber": "2222",
        "floor": "AE"
      }
    ];

    students2 =
    [
      {
        "firstName": "John",
        "lastName": "Doe",
        "studentEmail": "johndoe@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 2,
        "registrationNumber": "1111",
        "floor": "A"
      },
      {
        "firstName": "Alex",
        "lastName": "Smith",
        "studentEmail": "alexsmith@example.com",
        "course": "Math 101",
        "yearOfStudy": 3,
        "registrationNumber": "5555",
        "floor": "C"
      },
      {
        "firstName": "Bob",
        "lastName": "Bush",
        "studentEmail": "bobbush@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 3,
        "registrationNumber": "3333",
        "floor": "b"
      },
      {
        "firstName": "Sherry",
        "lastName": "Zhang",
        "studentEmail": "sherryzhang@example.com",
        "course": "CS101",
        "yearOfStudy": 3,
        "registrationNumber": "4444",
        "floor": "DD"
      },
      {
        "firstName": "Test2",
        "lastName": "Test2",
        "studentEmail": "test@example.com",
        "course": "Bsc Computer Science",
        "yearOfStudy": 4,
        "registrationNumber": "2222",
        "floor": "AE"
      }
    ];

    students3 =
    [
      {
        "firstName": "John",
        "lastName": "Doe",
        "studentEmail": "johndoe@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 2,
        "registrationNumber": "1111",
        "floor": "A"
      },
      {
        "firstName": "Alex",
        "lastName": "Smith",
        "studentEmail": "alexsmith@example.com",
        "course": "Math 101",
        "yearOfStudy": 3,
        "registrationNumber": "5555",
        "floor": "C"
      },
      {
        "firstName": "Bob",
        "lastName": "Bush",
        "studentEmail": "bobbush@example.com",
        "course": "Bsc Software Engineering",
        "yearOfStudy": 3,
        "registrationNumber": "3333",
        "floor": "b"
      },
      {
        "firstName": "Sherry",
        "lastName": "Zhang",
        "studentEmail": "sherryzhang@example.com",
        "course": "CS101",
        "yearOfStudy": 3,
        "registrationNumber": "4444",
        "floor": "DD"
      },
      {
        "firstName": "Test2",
        "lastName": "Test2",
        "studentEmail": "test@example.com",
        "course": "Bsc Computer Science",
        "yearOfStudy": 4,
        "registrationNumber": "2222",
        "floor": "AE"
      }
    ]
}
