'use strict'

export class Slider { //контроллер устройства типа диапазон значений
	constructor(range, value, name){
		this.name = name;
		this.type = 'range';
		this._range = range||[0, 100];
		this._value = value||Math.round((this._range[1]-this._range[0])/2);
	}
	valueSet(value) {if (value >= this._range[0] && value <= this._range[1]) this._value = value;}
	check() {return this._value;}
};

export class Button { //контроллер устройства типа кнопка вкл/выкл
	constructor(value, name) {
		this.name = name;
		this.type = 'boolean';
		this._value = value=='true' ? true : false||false;
	}
	valueSet() {this._value = !this._value;}
	check() {return this._value;}
};


export class List { //контроллер устройства типа список значений
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



export class SmartDev { //Класс объектов устройств вмещающих в себе контроллеры устройств
	constructor(name, dev) {
		this.name = name||'SmartDev';
		this._power = new Button(false, 'Power');
	}

	init(devCtrls) { //Создает контроллеры устройства (принимает объект содержащий тип, имя, значение контроллера)		
		for (let ctrl in devCtrls) {
			if (devCtrls[ctrl].type === 'boolean') this[ctrl] = new Button (devCtrls[ctrl].value, devCtrls[ctrl].name);
			if (devCtrls[ctrl].type === 'range') this[ctrl] = new Slider (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
			if (devCtrls[ctrl].type === 'list') this[ctrl] = new List (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
		}
	}

	check() {return this._power.check();}

	getInfo() {
		let res = {};
		let infoCtrl;
		if (!this.check()) return {'Status':'is sleep'};
		for (let key in this) {
			if (typeof this[key] == 'object') {
				infoCtrl = this[key].check();
				res[this[key].name] = infoCtrl === true ? 'On': infoCtrl === false ? 'Off': infoCtrl;
				}
			}
		return res;
	}

}


