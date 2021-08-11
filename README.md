## Angular setup

1. Init angular project with

```
ng new project-name
```

```
cd project-name
```

2. Add [@angular/elements](https://angular.io/guide/elements) package

```
ng add @angular/elements
```

3. Create and customize your components that you want ot use as web components

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

  `app.module.ts`

  ```ts
  @NgModule({
    ...
    bootstrap: [AppComponent],
    ...
  })
  ```

## Resources I used:

- [Creating Micro-frontends using Web Components (with support for Angular and React)](https://javascript.plainenglish.io/create-micro-frontends-using-web-components-with-support-for-angular-and-react-2d6db18f557a)
- [Merge all .js angular build files into one](https://stackoverflow.com/questions/42933220/how-to-get-one-file-as-output-of-angular-cli)
- [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)
