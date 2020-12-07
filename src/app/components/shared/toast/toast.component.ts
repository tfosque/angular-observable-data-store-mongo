import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from './../../../models/notification';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() note = new BehaviorSubject<Notification>({ message: '', show: false });
  // public note = new BehaviorSubject<Notification>({ message: '', show: false });


  constructor(
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.sendNotification(this.note.value);
    this.notificationService.notification.subscribe(notes => {
      this.note.next(notes);
      // console.log('toast:notifications:', { notes });
    });


  }

}
