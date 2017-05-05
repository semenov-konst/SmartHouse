'use strict'

class Slider {
	constructor(range, value, name){
		this.name = name;
		this.type = 'range';
		this._range = range||[0, 100];
		this._value = value||Math.round((this._range[1]-this._range[0])/2);
	}
	valueSet(value) {if (value > this._range[0] && value < this._range[1]) this._value = value;}
	check() {return this._value;}
};

/////////////////////////
class Button {
	constructor(value, name) {
		this.name = name;
		this.type = 'boolean';
		this._value = value=='true' ? true : false||false;
	}
	valueSet() {this._value = !this._value;}
	check() {return this._value;}
};


class List {
	constructor(range, value, name){
		this.name = name;
		this.type = 'list';
		this._range = range || ['0', '1', '2', '3', '4', '5'];
		this._value = value || 1;
	}
	valueSet(value) {
		if (value > 0 && this._value < this._range.length - 1) this._value++;
		if (value < 0 && this._value > 0) this._value--;
	}
	check() {return this._range[this._value];}
};



class SmartDev {
	constructor(name, dev) {
		this.name = name||'SmartDev';
		this._power = new Button(false, 'Power');
	};
	check() {return this._power.check();}
	getInfo() {
		let res = {};
		let infoCtrl;
		for (let key in this) {
			if (typeof this[key] == 'object') {
				infoCtrl = this[key].check();
				res[this[key].name] = infoCtrl === true ? 'On': infoCtrl === false ? 'Off': infoCtrl;
				}
			}
		//console.log('info from class SmartDev')
		//console.dir(res);
		return res;
	}

}


