import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  _alert$ = new BehaviorSubject('');
  _alertTimeout?: any;

  setAlert(payload: string) {
    this._alert$.next(payload);
    this._alertTimeout = setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  clearAlert() {
    if (this._alertTimeout) {
      clearTimeout(this._alertTimeout);
      this._alertTimeout = undefined;
    }
    this._alert$.next('');
  }
}
