import { Component, Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import '../../css/styles.scss';

const myRequiredValidator = (c: FormControl) => {

	if (c.value == null || String(c.value).length === 0) {
		// invalid
		return {
			myRequired: {
				valid: false
			}
		};
	}

	return null;
};

@Directive({
	selector: '[myRequired][ngModel]',
	providers: [{
			provide: NG_VALIDATORS, useValue: myRequiredValidator, multi: true
	}]
})
export class MyRequiredDirective { }

@Component({
	selector: 'my-app',
	styles: [require('./app.component.scss')],
	template: require('./app.component.html')
})
export class AppComponent {

	firstName: string = 'Initial Name';
	isEmployed: boolean = false;
	division: string = '';
	comments: string = '';
	stateOfResidence: string[] = ['MA','NY'];

	states: string[] = ['MA','VA','WA','NY','NH'];

	showData() {
		console.log(this);
	}

	consoleShow(o: FormControl) {
		//console.log(o);
		return o;
	}


}