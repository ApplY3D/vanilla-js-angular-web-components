import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert$ = this.alertService._alert$;

  constructor(private alertService: AlertService) {}

  onClose() {
    this.alertService.clearAlert();
  }

  ngOnInit(): void {}
}
