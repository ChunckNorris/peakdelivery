import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class Ui {
    loadingEvent: Observable<boolean>;
    _observer: Observer<boolean>;

    constructor(private toastCtrl: ToastController) { 
        this.loadingEvent = new Observable<boolean>(observer => this._observer = observer);
    }

    toast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top',
            cssClass: 'memd-toast'
        });

        toast.onDidDismiss(() => { });
        toast.present();
    }

    showLoadingIndicator(show: boolean) {
        this._observer.next(show);
    }
}










