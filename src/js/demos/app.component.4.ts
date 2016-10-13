import { Component, Injectable, Inject, OpaqueToken, forwardRef } from '@angular/core';

export interface MyService {
	doSomething: Function;
}

const myServiceToken = new OpaqueToken('MyService');

@Injectable()
export class Logger {
	log(msg: string) {
		console.log(msg);
	}
}

@Injectable()
export class FirstMyService implements MyService {

	constructor(private logger: Logger) {
	}

	doSomething() {
		this.logger.log('first my svc did it!');
	}

}

@Injectable()
export class SecondMyService implements MyService {

	doSomething() {
		console.log('second my svc did it!');
	}

}

// const svc = {
// 	doSomething: () => console.log('did it too!')
// };

const useCustomLogger: boolean = true;

const configureMyService = (fn: Function) => {
	return (logger: Logger): MyService => {
		if (fn()) {
			return new FirstMyService(logger);
		} else {
			return new SecondMyService();
		}
	};
};



@Component({
	selector: 'child',
	template: ``
})
export class ChildComponent {

	constructor(@Inject(myServiceToken) private myService: MyService) {
		this.myService.doSomething();
	}

}


@Component({
	selector: 'my-app',
	template: `<child></child>`,
	providers: [ {
		provide: myServiceToken,
		useFactory: configureMyService(() => useCustomLogger),
		deps: [ Logger ]
	}]
})
export class AppComponent {

	constructor(@Inject(myServiceToken) private myService: MyService) {
		this.myService.doSomething();
	}

}

