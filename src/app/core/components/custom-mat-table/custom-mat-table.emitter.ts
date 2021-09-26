import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription, Subscriber } from 'rxjs';

@Injectable()
export class MatTableEmitter {
  private events = new Subject();
  subscribe(next, error?, complete?): Subscription {
    return this.events.subscribe(next, error, complete);
  }
  next(event) { this.events.next(event); }
}
