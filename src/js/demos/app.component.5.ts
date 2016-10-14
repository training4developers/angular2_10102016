// https://github.com/training4developers/ng2-widgets-app

import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, Observer } from 'rxjs';

@Injectable()
export class Counter {

	getCounter() : Observable<number> {

			return Observable.create((observer: Observer<number>) => {

				const ws = new WebSocket('ws://localhost:3020');

				ws.addEventListener('open', function() {
					console.log('web socket connection is opened');
				});

				ws.addEventListener('message', function(e) {
					observer.next(e.data);
				});

			});

	}

}

@Injectable()
export class Products {

	private readonly baseUrl: string = 'http://svc.treeloop.com/products';

	constructor(private http: Http) {}

	getAll() {
		return this.http.get(this.baseUrl).map(res => res.json());
	}
}

@Component({
	selector: 'my-app',
	template: `<span>{{count | async}}</span>`,
	providers: [ Products, Counter ]
})
export class AppComponent implements OnInit {

	productList: any[];

	count: Observable<number>;

	constructor(
		private products: Products,
		private counter: Counter
	) {
	}

	ngOnInit() {

		// fetch('http://svc.treeloop.com/products')
		// 	.then(res => res.json())
		// 	.then(results => console.dir(results));

		// this.products.getAll().then((res: Response) => {
		// 	this.productList = res.json();
		// });

		// this.products.getAll().subscribe(results => {
		// 	console.dir(results);
		// });

		this.count = this.counter.getCounter();
	}

}

