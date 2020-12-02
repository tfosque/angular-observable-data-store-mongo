
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from './../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification = new BehaviorSubject<Notification>({ message: null, show: false });

  constructor() { }

  sendNotification(note: Notification): void {
    // console.log('notification', { note });
    this.notification.next(note);
  }
}
