import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() sidebarTitle = 'Menu';
  @Input() toolbarTitle = 'App';

  @Output() linkSelected = new EventEmitter<number>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onLinkClick(num: number) {
    this.linkSelected.emit(num);
  }

  onAlertClick(msg: string) {
    if (!msg) {
      return;
    }
    this.alertService.setAlert(msg);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private alertService: AlertService
  ) {}
}
