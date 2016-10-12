import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';

@Injectable()
export class Colors {

	private colors: string[] = ['red','blue','green','yellow'];
	getAll() {
		return this.colors;
	}

	insert(newColor: string) {
		this.colors.push(newColor);
	}
}

@Component({
	selector: 'my-header',
	template: `<header><h1>{{header}}</h1></header>`
})
export class MyHeaderComponent {

	@Input()
	header: string;

}

@Component({
	selector: 'my-list',
	template: `<ul><li *ngFor="let item of items">{{item}}</li></ul>`
})
export class MyListComponent {

	@Input()
	items: string[];
}

@Component({
	selector: 'my-form',
	template: `<form novalidate>
		<div>
			<label for="color">New Color:</label>
			<input type="text" id="color" name="color" [(ngModel)]="color">
		</div>
		<button type="button" (click)="addColor()">Add Color</button>
</form>`
})
export class MyFormComponent {

	color: string = '';

	@Output()
	newColor: EventEmitter<string> = new EventEmitter<string>();

	addColor() {
		this.newColor.emit(this.color);
	}

}


@Component({
	selector: 'my-app',
	template: `<my-header [header]="header"></my-header>
	<my-list [items]="colorList"></my-list>
	<my-form (newColor)="newColorHandler($event)"></my-form>`,
	//providers: [{ provide: Colors, useClass: Colors }]
	providers: [ Colors ]
})
export class AppComponent implements OnInit {

	header: string = "My Header";
	colorList: string[] = [];

	constructor(private colorsSvc: Colors) {
		//this.colors = colorsSvc.getAll();
	}

	newColorHandler(newColor: string) {
		this.colorsSvc.insert(newColor);
		this.colorList = this.colorsSvc.getAll();
	}

	ngOnInit() {
		this.colorList = this.colorsSvc.getAll();
	}

}