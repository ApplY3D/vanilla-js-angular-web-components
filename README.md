## Angular setup

### 1. Init angular project with

```
ng new project-name
```

```
cd project-name
```

### 2. Create and customize your components that you want ot use as web components

- Created alert component
- Created alert service

* I used [@angular/material](https://material.angular.io/) to create components with [schematics](https://material.angular.io/guide/schematics)

  - navigation

    navigation component have input and output

  `angular/src/app/navigation/navigation.component.ts`

  ```ts
  export class NavigationComponent {
    @Input() sidebarTitle = 'Menu';
    @Input() toolbarTitle = 'App';

    @Output() linkSelected = new EventEmitter<number>();

    ...
  }
  ```

  I have created example layout inside `app.component.html`, so to check how it works insure that it is bootstrapped:

  `angular/src/app/app.module.ts`

  ```ts
  @NgModule({
    ...
    bootstrap: [AppComponent],
    ...
  })
  ```

### 3. Add [@angular/elements](https://angular.io/guide/elements)

```
ng add @angular/elements
```

Configuring:

```ts
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [],
  providers: [],
  // clear bootstrap array before build!
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // use @angular/elements function to create custom element
    const customComponent = createCustomElement(AppComponent, {
      injector: this.injector,
    });

    // define custom element with browser api
    customElements.define('ng-custom-component', customComponent);
  }
}
```

### 4. Add [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)

```
ng add ngx-build-plus
```

- Add new scripts to your package.json

`package.json`

```json
"scripts": {
  /*...*/
  "build:single-bundle": "ng build --prod --output-hashing none --single-bundle true",
  "build:package-bundle": "cat dist/angular/{polyfills,main}.js > dist/angular/bundle.js",
  "build:web-components": "npm run build:single-bundle && npm run build:package-bundle"
}
```

Run `build:web-components` script to build project and generate `bundle.js`

### 5. Because I use material, I must cut all links with stylesheet from `index.html` and paste it to styles file

`styles.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.gstatic.com');
```

## Resources I used:

- [Creating Micro-frontends using Web Components (with support for Angular and React)](https://javascript.plainenglish.io/create-micro-frontends-using-web-components-with-support-for-angular-and-react-2d6db18f557a)
- [Merge all .js angular build files into one](https://stackoverflow.com/questions/42933220/how-to-get-one-file-as-output-of-angular-cli)
- [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)
