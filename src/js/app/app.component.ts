import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `<h1>{{header}}</h1>
<ul>
	<li *ngFor="let color of colors">{{color | uppercase}}</li>
</ul>`
})
export class AppComponent {

	header: string = 'My Colorful App!';

	colors: string[] = [
		'red','blue','black','apricot',
		'gold','green','white','saffron'
	];

}