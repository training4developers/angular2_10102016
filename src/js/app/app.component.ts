import { Component } from '@angular/core';
import { Colors } from './services/colors';

@Component({
	selector: 'my-app',
	template: `<h1>{{header}}</h1>
<ul>
	<li *ngFor="let color of sortedColors">{{color | uppercase}}</li>
</ul>
<div>
	<label for="new-color">New Color</label>
	<input type="text" id="new-color" name="newColor" [(ngModel)]="newColor">
	<button type="button" (click)="addColor()">Add Color</button>
</div>`,
	providers: [ Colors ]
})
export class AppComponent {

	constructor(private colors: Colors) { }

	header: string = 'My Colorful App!';
	newColor: string = '';

	addColor() {
		this.colors.insert(this.newColor);
		this.newColor = '';
	}

	get sortedColors() : string[] {
		return this.colors.getAll();
	}

}