# Web Components with Angular

Micro-frontends with Angular Web Components

## Init application

```bash
cd angular
npm i
npm run build:web-components
cd ../vanilla
open index.html
```

## How to build this application from scratch

### Angular configuration

#### 1. Init angular project with

I decided to name application angular, so

```bash
ng new angular
```

```bash
cd angular
```

#### 2. Create and customize your components that you want ot use as web components

- Created alert component
- Created alert service
- I used [@angular/material](https://material.angular.io/) to create components with [schematics](https://material.angular.io/guide/schematics):

  - navigation

    <b id="#props-binding">defining input and output</b>

  `angular/src/app/navigation/navigation.component.ts`

  ```ts
  export class NavigationComponent {
    @Input() sidebarTitle = 'Menu';
    @Input() toolbarTitle = 'App';

    @Output() linkSelected = new EventEmitter<number>();

    ...
  }
  ```

  I have created example layout inside `angular/src/app/app.component.html`, so to check how it works insure that it is bootstrapped:

  `angular/src/app/app.module.ts`

  ```ts
  @NgModule({
    ...
    bootstrap: [AppComponent],
    ...
  })
  ```

#### 3. Add [@angular/elements](https://angular.io/guide/elements)

```bash
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

    // define custom element with browser api in kebab-case (important, 2+ words)
    customElements.define('ng-custom-component', customComponent);
  }
}
```

#### 4. Add [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)

```bash
ng add ngx-build-plus
```

- Add new scripts to your package.json

`package.json`

```json
"scripts": {
  /*...*/
  "build:prod:no-hashes": "ng build --prod --output-hashing none --single-bundle true",
  "build:package-bundle": "cat dist/angular/{polyfills,main}.js > dist/angular/bundle.js",
  "build:web-components": "npm run build:prod:no-hashes && npm run build:package-bundle",
  "build:web-components:serve": "npm run build:prod:no-hashes && serve -l 5001 dist/angular"
}
```

Run `build:web-components` script to build project and generate `angular/dist/angular/bundle.js`

#### 5. Because I use material, I must cut all links with stylesheet from `angular/src/index.html` and paste it to styles file

`styles.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.gstatic.com');
```

### Vanilla configuration

Import `/angular/dist/angular/bundle.js` into your second application. After building, your `/angular/dist/angular/styles.css` might be empty, so skip it, if not, you must import also import it

`Please look into your built angular html file to check what you also need to import to your vanilla project or to your angular styles file`

There are 2 ways to connect angular bundle into your app:

<details>
<summary>1. By importing url into script file while serving angular builded project (not my way):</summary>

```bash
cd angular
npm run build:web-components:serve
```

Then copy all script imports from `angular/dist/angular/index.html` (there are more then two) inside your vanilla file:

```html
<script src="polyfills.js"></script>
<script src="main.js"></script>
```

<b>THEN ADD http://localhost:5001/ TO SCRIPT FILES:</b>

```html
<script src="http://localhost:5001/polyfills.js"></script>
<script src="http://localhost:5001/main.js"></script>
```

<b>Also import all styles</b>

```html
<script src="http://localhost:5001/styles.css"></script>
```

</details>

<details><summary>2. By importing builded bundle .js file</summary>

What I did inside [vanilla html](vanilla/index.html):

- Add css angular build

```html
<head>
  ...
  <link rel="stylesheet" href="../angular/dist/angular/styles.css" />
</head>
```

- Connect builded angular `.js` file into top of the body

```html
<body>
  <script src="../angular/dist/angular/bundle.js"></script>
  ...
</body>
```

- Add custom elements to html

```html
<ng-alert></ng-alert>
```

- Bind [input prop](#props-binding) in `kebab-case`

```html
<ng-navigation toolbar-title="Vanilla Toolbar"></ng-navigation>
```

- Add event listener to [output prop](#props-binding) inside script tag | file

```js
const nav = document.querySelector('ng-navigation');
nav.addEventListener('linkSelected', alert);
```

</details>

## Resources I used:

- [Creating Micro-frontends using Web Components (with support for Angular and React)](https://javascript.plainenglish.io/create-micro-frontends-using-web-components-with-support-for-angular-and-react-2d6db18f557a)
- [Merge all .js angular build files into one](https://stackoverflow.com/questions/42933220/how-to-get-one-file-as-output-of-angular-cli)
- [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)
