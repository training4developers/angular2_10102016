import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';

import '../../css/styles.scss';

import { AppComponent, ListBoxComponent } from './app.component';

@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule ],
	declarations: [ AppComponent, ListBoxComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }