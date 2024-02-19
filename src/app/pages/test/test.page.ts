import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor() { }

  ngOnInit() {
    LocalNotifications.requestPermissions();
    }
  callNotification(){
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Start Walking Now',
          body: 'Get fit star walking',
          id: 1,
        },
      ],
    });
  }
}
