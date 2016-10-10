import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `<h1>{{header}}</h1>`
})
export class AppComponent {

	header: string = 'My Colorful App!';

}