import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, MyRequiredDirective } from './app.component';

@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [ AppComponent, MyRequiredDirective ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }