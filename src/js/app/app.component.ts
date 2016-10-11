import { Component } from '@angular/core';
import { Colors } from './services/colors';

import '../../css/styles.scss';

@Component({
	selector: 'my-app',
	styles: [require('./app.component.scss')],
	template: require('./app.component.html'),
	providers: [ Colors ]
})
export class AppComponent {

	constructor(private colors: Colors) { }

	header: string = 'My Colorful App!';
	newColor: string = '';
	showMe: boolean = false;
	colorFilter: string = '';
	favColor: string = '';

	addColor() {
		this.colors.insert(this.newColor);
		this.newColor = '';
		this.colorFilterMap.clear();
	}

	colorFilterMap: Map<string, string[]> = new Map<string, string[]>();

	get sortedColors() : string[] {

		if (!this.colorFilterMap.has(this.colorFilter)) {
			console.log('applying color filter');
			this.colorFilterMap.set(this.colorFilter,
				this.colors.getAll().filter(color => color.startsWith(this.colorFilter)));
		}

		return this.colorFilterMap.get(this.colorFilter);
	}

}