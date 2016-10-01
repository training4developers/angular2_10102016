import { Component } from '@angular/core';

import '../../css/styles.scss';

declare var require: any;

@Component({
  selector: 'demo-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

  message: string = 'Hello World!!';

}
