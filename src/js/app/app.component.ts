import { Component, Injectable, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'list-box',
	template: `<div>
		<header><ng-content select=".header"></ng-content></header>
		<ul>
			<li *ngFor="let item of items">{{item}}</li>
		</ul>
	</div>`
})
export class ListBoxComponent {

	header: string = 'list box header';

	@Input()
	items: any[];

}



@Component({
	selector: 'my-app',
	template: `<list-box [items]="colors"><div class="header">{{header}}</div></list-box>
	<button (click)="send()">Send</button>`
})
export class AppComponent {

	header: string = 'app comp header';

	colors: string[] = ['red','blue','yellow','black'];

	send() {
		console.log('test');
	}

}