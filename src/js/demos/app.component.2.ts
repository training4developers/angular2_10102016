import { Component, Injectable, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs, Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';

import { Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable()
export class Counter {

	private ws: WebSocket;

	constructor() {
			this.ws = new WebSocket("ws://localhost:3020");
      this.ws.addEventListener('open', function() {
        console.log('web socket opened');
      });
	}

	getCounter(): Observable<number> {

		return Observable.create((observer: Observer<number>) => {

			this.ws.addEventListener('message', function(e) {

				const num = JSON.parse(e.data);

				if (num < 20) {
					observer.next(e.data);
				} else {
					observer.error('number too high');
				}

			});

		});
	}

}

interface Product {
	id: number,
	name: string,
	unitPrice: number,
	package: string,
	isDiscontinued: boolean
}

interface Author {
	id: number;
	firstName: string;
	lastName: string;
}

@Injectable()
export class Products { 

	private baseUrl: string = 'http://svc.treeloop.com/products';

	constructor(private http: Http, private jsonp: Jsonp) { }

	getAll(): Observable<Product> {
		return this.http.get(this.baseUrl).map(res => res.json());
	}

	get(productId: number): Observable<Product> {
		return this.http.get(`${this.baseUrl}/${productId}`).map(res => res.json());
	}

	insert(product: Product): Observable<Product> {
		const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
		const options: RequestOptions = new RequestOptions({ headers });
		return this.http.post(this.baseUrl, JSON.stringify(product), options).map(() => product);
	}

	update(product: Product): Observable<Product> {
		const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
		const options: RequestOptions = new RequestOptions({ headers });
		return this.http.put(`${this.baseUrl}/${product.id}`, JSON.stringify(product), options).map(() => product);
	}

	delete(productId: number): Observable<Product> {
		return Observable.create((observer: Observer<Product>) => {
			this.get(productId).subscribe(product => {
				this.http.delete(`${this.baseUrl}/${productId}`).subscribe(() => observer.next(product));
			});
		});
	}

	getAllAuthors(): Observable<Author> {

    let params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');

		return this.jsonp.get('http://localhost:3010/authors', { search: params }).map(res => {
			return res.json();
		});		

		// return this.http.get('http://localhost:3010/authors').map(res => {
		// 	return res.json().map((a: Author) => a);
		// });

	}

	insertAuthor(author: Author): Observable<Author> {

		const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
		const options: RequestOptions = new RequestOptions({ headers });

		return this.http.post(
				'http://localhost:3010/authors',
				JSON.stringify(author),
				options
			).map(() => author);
	}	

}

@Component({
	selector: 'my-app',
	template: require('./app.component.html'),
	providers: [ Counter, Products ]
})
export class AppComponent implements OnInit {

	counter2: Observable<number>;

	constructor(private counter: Counter, private products: Products) { }

	ngOnInit() {

		this.counter.getCounter().map((n: number) => 2*n).subscribe((c: number) => {
			console.log(c);
		}, (err: any) => console.log(err));

		//this.counter2 = this.counter.getCounter();

		// this.products.getAll().subscribe((p: Product) => {
		// 	console.log(p);
		// });

		// this.products.get(1).subscribe((p: Product) => {
		// 	console.dir(p);
		// });

		// this.products.getAllAuthors().subscribe((a: Author) => {
		// 	console.log(a);
		// });

		// this.products.insert({
		// 	id: 9999,
		// 	name: 'test',
		// 	unitPrice: 1.00,
		// 	package: 'test pkg',
		// 	isDiscontinued: true
		// }).subscribe((p: Product) => {
		// 	console.dir(p);
		// });

		// this.products.delete(40).subscribe(product => console.log(product));
	}

}
