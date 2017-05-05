'use strict'

///////////////////////
////model//////////////
///////////////////////

export class Model {
	constructor() {
		this._creater;
		this._currentDev;
	}
	init(creater) {
		this._creater = creater;
	}
	setCurrentDev(devType, devNum) {//установка текущего устройства
		this._currentDev = this._creater._devArr[devType][devNum];
	} 

	getCurrentDev() {return this._currentDev;} //возвращает текущее устройство

	delCurrentDev() { //удаляет текущее устройство
		if (!this._currentDev) return;
		this._creater.delDev(this._currentDev);
		delete this._currentDev;
	}
	getDevList() {return this._creater.getDevList();} //возвращает объект списка устройств

	getDevArrObj() {return this._creater.getDevArrObj();} //возвращает объект cодержащий массив созданных устройств

	getInfoCurDev() { //возвращает информацию о текущем устройстве
		if (!this._currentDev) return {'Status':'device not selected'};
		return this._currentDev.getInfo.apply(this._currentDev);
	}

}
