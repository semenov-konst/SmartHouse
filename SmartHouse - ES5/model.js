'use strict'


///////////////////////
////create/////////////
///////////////////////

function Creater() {
	this._devList;	//Список возможных устройств (объект)
	this._devArr = [];	//Список сгенерированных устройств (2-x массив)
	this._countDev = [];
	
}
Creater.prototype.init = function(devList) {
	this._devList = devList;
};
Creater.prototype.newDev = function(devType, name) {
	if (!this._devArr[devType]) this._devArr[devType] = [];
	if (!this._countDev[devType]) this._countDev[devType] = 0;
	this._countDev[devType]++;
	var dev = this._devList[devType];
	var name = name || this._genName(this._countDev[devType], dev.type); 
	var newDev = new SmartDev(name);
	this._devArr[devType].push(newDev);
	var devCtrls = this._devList[devType].control;
	for (var ctrl in devCtrls) {
		if (devCtrls[ctrl].type === 'boolean') newDev[ctrl] = new Button (devCtrls[ctrl].value, devCtrls[ctrl].name);
		if (devCtrls[ctrl].type === 'range') newDev[ctrl] = new Slider (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
		if (devCtrls[ctrl].type === 'list') newDev[ctrl] = new List (devCtrls[ctrl].range, devCtrls[ctrl].value, devCtrls[ctrl].name);
	}
	console.dir(newDev);
};
Creater.prototype.getArrDev = function(devType) {return this._devArr}; //возвращает массив устройств 
Creater.prototype._genName = function(countDev, name) { //генерирует имя устройства на основе его типа
		return name + ' ' + (countDev);
};
Creater.prototype.delDev = function(dev) { 
	for (var i = 0; i < this._devArr.length; i++) {
		if (!this._devArr[i]) continue;
		for (var j = 0; j < this._devArr[i].length; j++) {
			if (dev.name == this._devArr[i][j].name) {
				delete this._devArr[i][j];
				this._devArr[i].splice(j, 1);
				console.dir[this._devArr];
				return;
			}
		}
	}
};

///////////////////////
////model//////////////
///////////////////////

function Model() {
	this._creater;
	this._currentDev;
}
Model.prototype.init = function(creater) {
	this._creater = creater;
};
Model.prototype.setCurrentDev = function(devType, devNum) {
	this._currentDev = this._creater._devArr[devType][devNum];
};
Model.prototype.getCurrentDev = function() {
	return this._currentDev;
};
Model.prototype.delCurrentDev = function() {
	if (!this._currentDev) return;
	this._creater.delDev(this._currentDev);
	delete this._currentDev;
};
Model.prototype.getInfoCurDev = function() {
	if (!this._currentDev) return '...OOPS...';
	return this._currentDev.getInfo.apply(this._currentDev);
};
Model.prototype.getCtrlCurDev = function() {
	var res = {};
	var dev = this._currentDev;
	for (var ctrl in dev) {	
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
};

