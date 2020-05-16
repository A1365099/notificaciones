import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scheduled = [];
  
  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      })
    });

    this.plt.ready().then(() => {
      this.localNotifications.on('trigger ').subscribe(res => {
        let msg = res.data? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      })
    });
  }

  scheduleNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Notificacion',
      data: {mydata: 'Holi'}
    })
  }

  recurringNotification(){
    this.localNotifications.schedule({
      id: 2,
      title: 'Recurring',
      text: 'Recurring Notificacion',
      trigger: {every: ELocalNotificationTriggerUnit.MINUTE}
    })
  }

  repeatingNotification(){
    this.localNotifications.schedule({
      id: 3,
      title: 'Good Morning',
      text: 'holi de nuevo',
      trigger: {every: {hour:11, minute:49}}
    })
  }

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
}
