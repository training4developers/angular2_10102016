import { Component, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptionsArgs, Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';

import { Observable, Observer, Subject, BehaviorSubject, ReplaySubject, Subscriber } from 'rxjs';

@Component({
	selector: 'my-form',
	template: `<button type="button" (click)="clickMe()">Submit</button>`
})
export class MyForm {

	private _subscriber: Subscriber<void>;

	@Output()
	clicks: EventEmitter<void> = new EventEmitter<void>();
	//clicks: Observable<void> = new Observable<void>((subscriber: Subscriber<void>) => this._subscriber = subscriber).share();
	//clicks: Subject<void> = new Subject<void>();
	//clicks: ReplaySubject<void> = new ReplaySubject<void>(1);
	//clicks: BehaviorSubject<void> = new BehaviorSubject<void>(null);


	clickMe() {
		//this.clicks.next(null);
		//this._subscriber.next(null);
	}

}

@Component({
	selector: 'my-app',
	template: `<my-form (clicks)="clicks()"></my-form>`
})
export class AppComponent {

	clicks() {
		console.log('clicked');
	}

}

