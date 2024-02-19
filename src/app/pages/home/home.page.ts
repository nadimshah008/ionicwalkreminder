import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isStartTimeOpen: boolean = false;
  selectedStartTime: any;
  btnStartText: string = 'Select Start Time';
  isEndTimeOpen: boolean = false;
  selectedEndTime: any;
  btnEndText: string = 'Select End Time';
  currentTime: any;
  interval: any;
  reminderSubscription: any;
  permissionResult:any;
  constructor() {}
  ngOnInit() {
    console.log('loaded');
    this.requestPermission();
  }
  requestPermission(){
    this.permissionResult = LocalNotifications.requestPermissions();
    console.log("this.persmissionResult", this.permissionResult);
  }
  openStartTime() {
    this.isEndTimeOpen = false;
    this.isStartTimeOpen = !this.isStartTimeOpen;
    console.log(this.isStartTimeOpen);
    this.isStartTimeOpen
      ? (this.btnStartText = 'Close Start Time')
      : (this.btnStartText = 'Select Start Time');
    console.log(this.selectedStartTime) < this.selectedEndTime;
  }

  OpenEndTime() {
    this.isStartTimeOpen = false;
    this.isEndTimeOpen = !this.isEndTimeOpen;
    this.isEndTimeOpen
      ? (this.btnEndText = 'Close End Time')
      : (this.btnEndText = 'Select End Time');
  }

  startReminders() {
    this.isEndTimeOpen = false;
    this.isStartTimeOpen = false;
    console.log('STARTED');
    this.currentTime = new Date().getTime();
    let startTime = new Date(this.selectedStartTime).getTime();
    let endTime = new Date(this.selectedEndTime).getTime();
    const timer = setInterval(() => {
      this.currentTime = new Date().getTime();
      if (this.currentTime >= startTime && this.currentTime <= endTime) {
        console.log('SELECTED START TIME REACHED');
        this.callNotification();
      } else if (this.currentTime >= endTime) {
        this.callNotification();
        clearInterval(timer);
        console.log('SELECTED END TIME REACHED');
      }
    }, parseInt(this.interval) * 60 * 1000);
  }


  async callNotification() {
    if(this.permissionResult.granted)
    console.log('HOW TO START NOTIFICATION');
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Start Walking Now',
          body: 'Get fit star walking',
          id: 1,
          schedule: {
            at: new Date(this.currentTime),
          },
        },
      ],
    });
  }
}
