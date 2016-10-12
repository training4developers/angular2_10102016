import { Component, Input, Injectable, OnInit } from '@angular/core';

@Injectable()
export class Colors {
	getAll() {
		return ['red','blue','green','yellow'];
	}
}

@Injectable()
export class MyColors {
	getAll() {
		return ['purple','blue','green','yellow'];
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
	selector: 'my-app',
	template: `<my-header [header]="header"></my-header><my-list [items]="colors"></my-list>`,
	//providers: [{ provide: Colors, useClass: Colors }]
	providers: [ Colors ]
})
export class AppComponent implements OnInit {

	header: string = "My Header";
	colors: string[] = [];

	constructor(p: Colors) {
		//this.colors = colorsSvc.getAll();
	}

	ngOnInit() {
		this.colors = this.colorsSvc.getAll();
	}

}