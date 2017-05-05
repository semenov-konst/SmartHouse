'use strict'
///////////////////////
////create/////////////
///////////////////////
import {Slider, List, Button, Range, SmartDev} from './smartDev';

export class Creater {
	constructor() {
		this._devList;	//Список возможных устройств (объект)
		this._devArr = {};	//Список сгенерированных устройств (2-x массив)
		this._countDev = {};
	}

	init(devList) {
		this._devList = devList;
	}
	newDev(devType, devName) { //Создает новое устройство, Возвращает номер устройства в списке устройств
		if (!this._devArr[devType]) this._devArr[devType] = [];
		if (!this._countDev[devType]) this._countDev[devType] = 0;
		this._countDev[devType]++;
		let dev = this._devList[devType];
		let name = devName || this._genName(this._countDev[devType], dev.type); 
		let newDev = new SmartDev(name);
		this._devArr[devType].push(newDev);
		let devCtrls = this._devList[devType].control;
		newDev.init(devCtrls);				//Вызывает установку контроллеров устройства 
		return this._countDev[devType]-1	//Возвращает номер устройства в списке устройств
	}

	getDevArrObj() {return this._devArr};   //объект массивов устройств
	getDevList() { 							//возвращает объект типов устройств 
		return this._devList;
	}; 

	delDev(dev) { 							//Удаляет устройство (принимет объект устройства)
		for (let i in this._devArr) {
			if (!this._devArr[i]) continue;
			for (let j = 0; j < this._devArr[i].length; j++) {
				if (dev.name == this._devArr[i][j].name) {
					delete this._devArr[i][j];
					this._devArr[i].splice(j, 1);
					return;
				}
			}
		}
	}
	_genName(countDev, name) { //генерирует имя устройства на основе его типа
		return name + ' ' + (countDev);
	}
}