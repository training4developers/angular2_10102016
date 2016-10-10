import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `<h1>{{header}}</h1>
<ul>
	<li *ngFor="let color of sortedColors;">{{color}}</li>
</ul>
<div>
	<label for="new-color">New Color</label>
	<input type="text" id="new-color" name="newColor" [(ngModel)]="newColor">
	<button type="button" (click)="addColor(newColor)">Add Color</button>
</div>`
})
export class AppComponent {

	header: string = 'My Colorful App!';
	newColor: string = '';

	colors: string[] = [
		'red','blue','black','apricot',
		'gold','green','white','saffron'
	];

	lastColors: string[] = [];
	_sortedColors: string[] = [];

	addColor(nc: string) {
		this.colors = this.colors.concat(nc);
		this.newColor = '';
	}

	get sortedColors() : string[] {

		if (this.lastColors != this.colors) {
			console.log('sorting colors');
			this._sortedColors = this.colors.concat().sort();
			this.lastColors = this.colors;
		}
		return this._sortedColors;
	}

}