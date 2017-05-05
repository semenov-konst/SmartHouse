'use strict'

///////////////////////
////CONTROL////////////
///////////////////////

class Control {
	constructor(model) {
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

	monitor() { //назначает обработчики существующим кнопкам html
		for (let i = 0; i < this.addDev.length; i++) {
			this.addDev[i].onclick = this._addDev.bind(this);
		} 
		this.delDev.onclick = this._delDev.bind(this);
	}

	_addDev(event) {  //обработчик кнопок добавления устройств
		let curDev = this._model.getCurrentDev;
		let devType = event.toElement.value;
		this._model._creater.newDev(devType);
		let div = this.list[devType];
		this.control.innerHTML = '';
		this._createList(); //добавление радиокнопок устройств
	}

	_createList() { //создает радиокнопки для выбора устройств
		let devArr = this._model._creater.getArrDev();
		for (let devType = 0; devType < devArr.length; devType++) {
			let div = this.list[devType];
			div.innerHTML = '';
			if (!devArr[devType]) continue;
			if (devArr[devType].length) {
				for (let i = 0; i < devArr[devType].length; i++) {
					let name = devArr[devType][i].name;
					let radio = document.createElement('input');
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

	_delDev(event) {  //обработчик кнопки удаления устройств
		this._model.delCurrentDev();
		this.control.innerHTML = '';
		this._createList();
		this._updateInfo();
	}

	_updateInfo() {
		if (!this._model.getCurrentDev())	{ this.info.innerHTML = '..........OOOOPS..........'; return;}
		let curDev = this._model.getCurrentDev();
		if (!curDev.check())				{ this.info.innerHTML = '.....Device is sleep.....'; return; }
		let infoObj = this._model.getInfoCurDev();
		let infoStr = '';
		for (let ctrl in infoObj) {
			infoStr += ctrl + ': ' + infoObj[ctrl] + '\n';
		}
		this.info.innerHTML = infoStr;
	}

	_selectDev(event) { //Обработчик выбора устройств
		let eventArr = event.toElement.value.split(',');
		let devType = eventArr[0];
		let devNum = eventArr[1];	
		this._model.setCurrentDev(devType, devNum);
		this._updateInfo();
		this._createControls(this.control);
	}

	_createControls(div) { //Создает контроллеры устройств
		div.innerHTML = '';
		let model = this._model;
		let controls = this._model.getCtrlCurDev();
		for (let ctrl in controls) {
			if (controls[ctrl].type === 'boolean') {
				let button = this._createButton("width:100px; height:20px", ctrl, 'on/off');
				div.appendChild(button);
				div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
				div.appendChild(document.createElement('br'));
			} else if (controls[ctrl].type === 'list') {
				let button1 = this._createButton("width:50px; height:20px", ctrl, '-');
				let button2 = this._createButton("width:50px; height:20px", ctrl, '+');
				div.appendChild(button1);
				div.appendChild(button2);
				div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
				div.appendChild(document.createElement('br'));
			} else if (controls[ctrl].type === 'range') {
				let button1 = this._createButton("width:50px; height:20px", ctrl, '-');
				let button2 = this._createButton("width:50px; height:20px", ctrl, '+');
				div.appendChild(button1);
				div.appendChild(button2);
				div.appendChild(document.createTextNode(' ' + controls[ctrl].name));
				div.appendChild(document.createElement('br'));
			}
		}
	}

	_createButton(style, name, value) {
				let button = document.createElement('input');
				button.type = 'button';
				button.name = name;
				button.style = style;
				button.onclick = this._handler.bind(this);
				button.value = value;
				return button;
	}

	_handler(event) { //обработчик управления утройствами
		//console.dir(event);
		let model = this._model;
		let devCtrl = this._model.getCtrlCurDev();
		let dev = this._model.getCurrentDev();
		let devStatus = dev.check.call(dev);
		let ctrlName = event.toElement.name;

		if (!devStatus && ctrlName != '_power') return;
		for (let ctrl in devCtrl) {
			if (event.toElement.name == ctrl) {
				if (devCtrl[ctrl].type == 'boolean') {
					devCtrl[ctrl].set.call(dev[ctrl]);
					break;
				} else if (devCtrl[ctrl].type == 'range') {
					let val = devCtrl[ctrl].check.call(dev[ctrl]);
					if (event.toElement.value == '+') val++;
					if (event.toElement.value == '-') val--;
					devCtrl[ctrl].set.call(dev[ctrl], val);
					break;
				} else if (devCtrl[ctrl].type == 'list') {
					let val = 0;
					if (event.toElement.value == '+') val++;
					if (event.toElement.value == '-') val--;
					devCtrl[ctrl].set.call(dev[ctrl], val);
					break;
				}

			}
				
		}
		this._updateInfo();
	}
}
