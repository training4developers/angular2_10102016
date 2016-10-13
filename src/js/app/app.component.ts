import { Component, Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class Products {

	private readonly baseUrl: string = 'http://svc.treeloop.com/products';

	constructor(private http: Http) {}

	getAll() {
		return this.http.get(this.baseUrl).toPromise();
	}
}

@Component({
	selector: 'my-app',
	template: `<ul><li *ngFor="let product of productList">{{product.name}}</li></ul>`,
	providers: [ Products ]
})
export class AppComponent implements OnInit {

	productList: any[];

	constructor(private products: Products) {
	}

	ngOnInit() {

		// fetch('http://svc.treeloop.com/products')
		// 	.then(res => res.json())
		// 	.then(results => console.dir(results));

		this.products.getAll().then((res: Response) => {
			this.productList = res.json();
		});
	}

}

