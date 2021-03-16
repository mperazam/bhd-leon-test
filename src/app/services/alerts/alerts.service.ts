import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastController: ToastController) { }


  async presentToast(message?: string, duration?: number, color?: string, position?: "top" | "bottom" | "middle") {
    let defaultDuration = 3000;
    if (duration) {
      defaultDuration = duration;
    }
    const toast = await this.toastController.create({
      message,
      duration: defaultDuration,
      color,
      position
    });
    toast.present();
  }
}
