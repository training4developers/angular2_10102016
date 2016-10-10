import { Injectable } from '@angular/core';

@Injectable()
export class Colors {

	private _colors: string[] = ['red','green','blue'];
	private _lastColors: string[] = [];
	private _sortedColors: string[] = [];

	getAll(): string[] {
		if (this._colors !== this._lastColors) {
			console.log('sorting colors');
			this._sortedColors = this._colors.sort();
			this._lastColors = this._colors;
		}
		return this._sortedColors;
	}

	insert(color: string) {
		this._colors = this._colors.concat(color);
	}
}