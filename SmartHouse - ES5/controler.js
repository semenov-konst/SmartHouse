'use strict'

///////////////////////
////CONTROL////////////
///////////////////////

function Control(model){
	this._model = model;
	this.addDev = [
		document.getElementById('addDev0'),
		document.getElementById('addDev1'),
		document.getElementById('addDev2')
	];

	this.list = [
		document.getElementById('list0'),
		document.getElementById('list1'),
		document.getElementById('list2')
	];
	this.info = document.getElementById('info');
	this.control = document.getElementById('control');
	this.delDev = document.getElementById('delDev');



}

Control.prototype.monitor = function() {
	for (var i = 0; i < this.addDev.length; i++) {
		this.addDev[i].onclick = this._addDev.bind(this);
	} 
	this.delDev.onclick = this._delDev.bind(this);
}

Control.prototype._addDev = function(event) {  //обработчик кнопок добавления устройств
	console.log('addDev');
	console.dir(event);
	var curDev = this._model.getCurrentDev;
	var devType = event.toElement.value;
	this._model._creater.newDev(devType);
	var div = this.list[devType];
	this.control.innerHTML = '';
	this._createList(); //добавление кнопок устройств
}

Control.prototype._delDev = function(event) {  //обработчик кнопок удаления устройств
	this._model.delCurrentDev();
	this.control.innerHTML = '';
	this._createList();
	this._updateInfo();

}

Control.prototype._createList = function() { //создает радиокнопки для выбора устройств (родительский элем. для кнопок, массив устройств, )
	var devArr = this._model._creater.getArrDev();
	for (var devType = 0; devType < devArr.length; devType++) {
		var div = this.list[devType];
		div.innerHTML = '';
		if (!devArr[devType]) continue;
		if (devArr[devType].length) {
			for (var i = 0; i < devArr[devType].length; i++) {
				var name = devArr[devType][i].name;
				var radio = document.createElement('input');
				radio.type = 'radio';
				radio.name = 'dev';
				radio.value = [devType, i];
				radio.onclick = this._selectDev.bind(this);
				div.appendChild(radio);
				div.appendChild(document.createTextNode(name));
				div.appendChild(document.createElement('br'));
			}
		}
	}

}
Control.prototype._updateInfo = function() {
	if (!this._model.getCurrentDev()) { this.info.innerHTML = '..........OOOOPS..........';	 return;}
	var curDev = this._model.getCurrentDev();
	if (!curDev.check()) { this.info.innerHTML = '.....Device is sleep.....';		 return; }
	var infoObj = this._model.getInfoCurDev();
	var infoStr = '';
	for (var ctrl in infoObj) {
		infoStr += ctrl + ': ' + infoObj[ctrl] + '\n';
	}
	this.info.innerHTML = infoStr;
}

Control.prototype._selectDev = function(event) { //Обработчик выбора устройств
	var eventArr = event.toElement.value.split(',');
	var devType = eventArr[0];
	var devNum = eventArr[1];	
	this._model.setCurrentDev(devType, devNum);
	this._updateInfo();
	console.log(this.name + ' ' + this.value);
	this._createControls(this.control);
}; 

Control.prototype._createControls = function(div) { //Создает контроллеры устройств
	div.innerHTML = '';
	var model = this._model;
	var controls = this._model.getCtrlCurDev();
	console.log('controls');
	console.dir(controls);
	for (var ctrl in controls) {
		if (controls[ctrl].type === 'boolean') {
			var button = this._createButton("width:100px; height:20px", ctrl, 'on/off');
			div.appendChild(button);
			div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
			div.appendChild(document.createElement('br'));
		} else if (controls[ctrl].type === 'list') {
			var button1 = this._createButton("width:50px; height:20px", ctrl, '-');
			var button2 = this._createButton("width:50px; height:20px", ctrl, '+');
			div.appendChild(button1);
			div.appendChild(button2);
			div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
			div.appendChild(document.createElement('br'));
		} else if (controls[ctrl].type === 'range') {
			var button1 = this._createButton("width:50px; height:20px", ctrl, '-');
			var button2 = this._createButton("width:50px; height:20px", ctrl, '+');
			div.appendChild(button1);
			div.appendChild(button2);
			div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
			div.appendChild(document.createElement('br'));
		}
	}
}
Control.prototype._createButton = function(style, name, value) {
			var button = document.createElement('input');
			button.type = 'button';
			button.name = name;
			button.style = style;
			button.onclick = this._handler.bind(this);
			button.value = value;
			return button;
}

Control.prototype._handler = function(event) { //обработчик управления утройствами
	//console.dir(event);
	var model = this._model;
	var devCtrl = this._model.getCtrlCurDev();
	var dev = this._model.getCurrentDev();
	var devStatus = dev.check.call(dev);
	var ctrlName = event.toElement.name;

	if (!devStatus && ctrlName != '_power') return;
	for (var ctrl in devCtrl) {
		if (event.toElement.name == ctrl) {
			if (devCtrl[ctrl].type == 'boolean') {
				devCtrl[ctrl].set.call(dev[ctrl]);
				break;
			} else if (devCtrl[ctrl].type == 'range') {
				var val = devCtrl[ctrl].check.call(dev[ctrl]);
				if (event.toElement.value == '+') val++;
				if (event.toElement.value == '-') val--;
				devCtrl[ctrl].set.call(dev[ctrl], val);
				console.log(val);
				break;
			} else if (devCtrl[ctrl].type == 'list') {
				var val = 0;
				if (event.toElement.value == '+') val++;
				if (event.toElement.value == '-') val--;
				devCtrl[ctrl].set.call(dev[ctrl], val);
				console.log(devCtrl[ctrl].check.call(dev[ctrl]));
				break;
			}

		}
			
	}
	console.dir(dev);
	this._updateInfo();
	
}
