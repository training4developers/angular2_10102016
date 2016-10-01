import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';

class MockRouter { createUrlTree() {} }

describe('App', () => {

	let fixture: ComponentFixture<AppComponent>;
	let theComponent: AppComponent;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ AppComponent ]
		});

		fixture = TestBed.createComponent(AppComponent);
		theComponent = fixture.componentInstance;

		de = fixture.debugElement.query(By.css('h1'));
		el = de.nativeElement;

	});

  it ('app initialization', () => {

    fixture.detectChanges();

    expect(el.innerText).toBe('Hello World!!');

  });

});
