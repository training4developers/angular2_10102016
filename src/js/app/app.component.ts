import { Component } from '@angular/core';

import '../../css/styles.scss';

@Component({
	selector: 'my-app',
	styles: [require('./app.component.scss')],
	template: require('./app.component.html')
})
export class AppComponent {

	firstName: string = '';


}