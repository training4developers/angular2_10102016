import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '../../css/styles.scss';

import { AppComponent, MyHeaderComponent, MyListComponent, MyFormComponent, MinLenValidatorDirective } from './app.component';

@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [
		AppComponent, MyHeaderComponent, MyListComponent, MyFormComponent, MinLenValidatorDirective
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }