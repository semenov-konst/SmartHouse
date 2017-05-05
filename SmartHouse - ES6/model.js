'use strict'
///////////////////////
////create/////////////
///////////////////////

class Creater {
	constructor() {
		this._devList;	//Список возможных устройств (объект)
		this._devArr = [];	//Список сгенерированных устройств (2-x массив)
		this._countDev = [];
	}

	init(devList) {
		this._devList = devList;
	}
	newDev(devType, devName) {
		if (!this._devArr[devType]) this._devArr[devType] = [];
		if (!this._countDev[devType]) this._countDev[devType] = 0;
		this._countDev[devType]++;
		let dev = this._devList[devType];
		let name = devName || this._genName(this._countDev[devType], dev.type); 
		let newDev = new SmartDev(name);
		this._devArr[devType].push(newDev);
		let devCtrls = this._devList[devType].control;
		for (let ctrl in devCtrls) {
			if (devCtrls[ctrl].type === 'boolean') newDev[ctrl] = new Button (devCtrls[ctrl].value, devCtrls[ctrl].name);
			if (devCtrls[ctrl].type === 'range') newDev[ctrl] = new Slider (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
			if (devCtrls[ctrl].type === 'list') newDev[ctrl] = new List (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
		}
		//console.dir(newDev);
	}

	getArrDev(devType) {return this._devArr}; //возвращает массив устройств 

	delDev(dev) { 
		for (let i = 0; i < this._devArr.length; i++) {
			if (!this._devArr[i]) continue;
			for (let j = 0; j < this._devArr[i].length; j++) {
				if (dev.name == this._devArr[i][j].name) {
					delete this._devArr[i][j];
					this._devArr[i].splice(j, 1);
					console.dir[this._devArr];
					return;
				}
			}
		}
	}
	_genName(countDev, name) { //генерирует имя устройства на основе его типа
		return name + ' ' + (countDev);
	}
}

///////////////////////
////model//////////////
///////////////////////

class Model {
	constructor() {
		this._creater;
		this._currentDev;
	}
	init(creater) {
		this._creater = creater;
	}
	setCurrentDev(devType, devNum) {this._currentDev = this._creater._devArr[devType][devNum];}

	getCurrentDev() {return this._currentDev;}

	delCurrentDev() {
		if (!this._currentDev) return;
		this._creater.delDev(this._currentDev);
		delete this._currentDev;
	}
	getInfoCurDev() {
		if (!this._currentDev) return '...OOPS...';
		return this._currentDev.getInfo.apply(this._currentDev);
	}
	getCtrlCurDev() {
		let res = {};
		let dev = this._currentDev;
		for (let ctrl in dev) {	
			if (!dev.hasOwnProperty(ctrl)) continue
			if (typeof dev[ctrl] != 'object') continue;
			res[ctrl] = {name:dev[ctrl].name,
						type: dev[ctrl].type,
						set: dev[ctrl].valueSet,
						check: dev[ctrl].check};
		}
		console.log('getCtrlCurDev');
		console.dir(res);
		return res;
	}
}
