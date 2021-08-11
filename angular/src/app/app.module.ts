import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AlertComponent } from './alert/alert.component';
import { NavigationComponent } from './navigation/navigation.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent, AlertComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  // clear bootstrap array before build!
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ngAlertComponent = createCustomElement(AlertComponent, {
      injector: this.injector,
    });
    const ngNavigationComponent = createCustomElement(NavigationComponent, {
      injector: this.injector,
    });

    customElements.define('ng-alert', ngAlertComponent);
    customElements.define('ng-navigation', ngNavigationComponent);
  }
}
