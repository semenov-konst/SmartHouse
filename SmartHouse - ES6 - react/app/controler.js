'use strict'
import React from "react";
import ReactDOM from "react-dom";
import {View} from './view';
///////////////////////
////CONTROL////////////
///////////////////////

export class Control {
	constructor(model, view) {
		this._view = view;
		this._model = model;
		this._typeDevObj = this._model.getDevList();
		this._devArrObj = this._model.getDevArrObj();
	}

	init() { 
		this._view.init(this._typeDevObj, this._devArrObj, this);
	}

	addDev(event) {  //Обработчик кнопок добавления устройств
		let devType = event.value;
		let devNum = this._model._creater.newDev(devType);
		this.selectDev([devType, devNum]); //выбор текущего устройства
		this._updateInfo();
 	}

	delDev(event) {  //Обработчик кнопки удаления устройств
		this._model.delCurrentDev();
		this._view.control.innerHTML = '';
		this._view.updateDevList();
		this._updateInfo();
	}

	_updateInfo() { //Обновление информации
		let infoCurDev = this._model.getInfoCurDev();
		this._view.updateInfo(infoCurDev);
	}

	selectDev(value) { //Обработчик выбора устройств
		let devType = value[0];
		let devNum = value[1];	
		this._model.setCurrentDev(devType, devNum);
		this._view.updateDevList(devType, devNum);
		this._updateInfo();
	}

	getCtrlCurDev() { //Возвращает объект с контроллерами текущего устройства
		let res = {};
		let dev = this._model.getCurrentDev();
		for (let ctrl in dev) {	
			if (!dev.hasOwnProperty(ctrl)) continue
			if (typeof dev[ctrl] != 'object') continue;
			res[ctrl] = {name:dev[ctrl].name,
						type: dev[ctrl].type,
						set: dev[ctrl].valueSet,
						check: dev[ctrl].check};
		}
		return res;
	}
	handler(event) { //Обработчик кнопок управления утройствами
		let model = this._model;
		let devCtrl = this.getCtrlCurDev();
		let dev = this._model.getCurrentDev();
		let devStatus = dev.check.call(dev);
		let ctrlName = event.value;
		let value = event.name;

		if (!devStatus && ctrlName != '_power') return;
		for (let ctrl in devCtrl) {
			if (ctrlName == ctrl) {
				if (devCtrl[ctrl].type == 'boolean') {
					devCtrl[ctrl].set.call(dev[ctrl]);
					break;
				} else if (devCtrl[ctrl].type == 'range') {
					let val = devCtrl[ctrl].check.call(dev[ctrl]);
					if (value == '+') val++;
					if (value == '-') val--;
					devCtrl[ctrl].set.call(dev[ctrl], val);
					break;
				} else if (devCtrl[ctrl].type == 'list') {
					let val = 0;
					if (value == '+') val++;
					if (value == '-') val--;
					devCtrl[ctrl].set.call(dev[ctrl], val);
					break;
				}

			}
				
		}
		this._updateInfo();
	}
}