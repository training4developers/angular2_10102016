import { Component, Input, Injectable, OnInit, Directive,
	Output, EventEmitter, Pipe, PipeTransform, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[minLen][ngModel]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => MinLenDirective),
		multi: true
	}]
})
export class MinLenDirective {

	private _minLen: number;

	@Input()
	set minLen(value: any) {
		const intValue = parseInt(value, 10);
		this._minLen = intValue || 0;
	}

	validate(c: FormControl) {

		console.log(this._minLen);

		if (this._minLen > 0 && (c.value == null || String(c.value).length < this._minLen)) {
			console.log('minLen invalid');
			return { minlen: true };
		}
		console.log('minLen valid');
		return null;
	}
}

@Directive({
	selector: '[minlen][ngModel]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => MinLenValidatorDirective),
		multi: true
	}]
})
export class MinLenValidatorDirective {

	private _minLen: number;

	@Input('minlen')
	set minLen(value: any) {
		const intValue = parseInt(value, 10);
		this._minLen = intValue || 0;
	}


	validate(c: FormControl): any {

		console.log('validator was executed');

		if (String(c.value).length < this._minLen) {
			return {
				minlen: true
			};
		}

		return null;
	}

}

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
			<input type="text" id="color" name="color" [(ngModel)]="color" [minlen]="minLen">
		</div>
		<button type="button" (click)="addColor()">Add Color</button>
</form>`
})
export class MyFormComponent {

	color: string = '';
	minLen: number = 3;

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