'use strict'
/////////////////////
////////view/////////
/////////////////////
import React from "react";
import ReactDOM from "react-dom";

import {Table} from './react';
import {Rows} from './react';
import {InfoTable} from './react';
import {Button} from './react';
import {ControlList} from './react';
import {RadioButton} from './react';
import {RadioButtonList} from './react';


export class View {
	constructor() {
		this._typeDevObj;
		this._devArrObj;
		this._controler;
		this.addDev = [];
		this.list = {};

		this.info = document.getElementById('info');
		this.control = document.getElementById('control');
		this.delDev = document.getElementById('delDev');

	}

	init(typeDevObj, devArrObj, controler) { 
		this._controler = controler;
		this._typeDevObj = typeDevObj;
		this._devArrObj = devArrObj;
		let items = this._getDivArr(); 
		this._createTable(items); //Создание таблицы устройств
		this._setDiv();
		
		//Создание кнопок добавления устройств
		for (let i = 0; i < items.length; i++) {
			//debugger;
			ReactDOM.render(
				<Button onClick = {this._controler.addDev.bind(this._controler)}
						name = {'Add ' + this._typeDevObj[items[i]].type}
						value = {items[i]}
						style = {{width: 120, height: 20}}
						/>,
				this.addDev[i]
			);

			let divName = document.getElementById(items[i] + '_name');
			divName.innerHTML = 'List ' + this._typeDevObj[items[i]].type;

		}

		//Создание кнопки удаления устройств
		ReactDOM.render(
			<Button onClick={this._controler.delDev.bind(this._controler)}
					name='....Delete device....'
					style = {{width: '100%', height: 20}}
					/>,
			this.delDev
		);

	}
	updateInfo(infoObj) {
		let infoStr ='';
		//debugger;
			for (let ctrl in infoObj) {
				infoStr += ctrl + ': ' + infoObj[ctrl] + '\n';
			}
		
				ReactDOM.render(
					<InfoTable text = {infoStr}/>,
					this.info
					);
	}
	
	
	updateDevList(devType, devNum) {
		this._createList(devType, devNum);
		if (devType) this._createControls();
	}
	_getDivArr() { 

		let divArr = [];
		for (let devType in this._typeDevObj) {
			divArr.push(devType);
		}
		return divArr;
	}

	_createTable(items) { //Создание таблицы устройств
		ReactDOM.render(
				<Table items = {items}/>,
				document.getElementById('table')
			);
	}
	_createList(curDevType, curDevNum) { //создает радиокнопки для выбора устройств
		let typeDevObj = this._typeDevObj;
		let devArrObj = this._devArrObj;
		for (let devType in typeDevObj) {
			let div = this.list[devType];
			div.innerHTML = '';
			if (!devArrObj[devType]) continue;
			if (devArrObj[devType].length) {
				let item = [];
				for (let i = 0; i < devArrObj[devType].length; i++) {
					let name = 'dev';
					let value = [devType, i];
					let onChange = this._controler.selectDev.bind(this._controler);
					let label = devArrObj[devType][i].name;
					let checked;
					if (curDevType == devType && curDevNum == i) {
						//debugger;
						checked = true;
					} else checked = false;
					
					item[i] = {value, name, onChange, label, checked};
				}

				ReactDOM.render(
					<RadioButtonList items = {item}/>,
					div
					);
			}
		}
	}

	_createControls() { //Создает контроллеры устройств
		let div = this.control;
		div.innerHTML = '';
		let controls = this._controler.getCtrlCurDev();
		let item = [];
		let i = 0;
		for (let ctrl in controls) {				
			let style;
			let name;
			let value;		
			let onClick = this._controler.handler.bind(this._controler);
			let breakLine;
			let label;
			if (controls[ctrl].type === 'boolean') {
				style = {width: 100, height: 20};
				value = ctrl;
				label = controls[ctrl].name;
				item.push({name:'on/off', value, onClick, breakLine:false, style, label})

			} else if (controls[ctrl].type === 'list') {
				style = {width: 50, height: 20};
				value = ctrl;
				label = controls[ctrl].name;
				item.push({name:'-', value, onClick, breakLine:true, style, label})
				item.push({name:'+', value, onClick, breakLine:false, style, label})

			} else if (controls[ctrl].type === 'range') {
				style = {width: 50, height: 20};
				value = ctrl;
				label = controls[ctrl].name;
				item.push({name:'-', value, onClick, breakLine:true, style, label})
				item.push({name:'+', value, onClick, breakLine:false, style, label})

				
			}
			//debugger;
		}
		ReactDOM.render(
					<ControlList items = {item}/>,
					div
					);
		
	}
	_setDiv() {
		this.addDev = [];
		let divArr = [];
		this.list = {};

		for (let devType in this._typeDevObj) {
			this.addDev.push(document.getElementById(devType + '_add'));
			this.list[devType] = document.getElementById(devType + '_list');
		}
	}
}