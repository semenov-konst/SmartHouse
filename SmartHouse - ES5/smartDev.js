'use strict'

function Slider(range, value, name) {
	//var self = this;
	this.name = name;
	this.type = 'range';
	this._range = range||[0, 100];
	this._value = value||Math.round((this._range[1]-this._range[0])/2);
};
Slider.prototype.valueSet = function(value) {if (value > this._range[0] && value < this._range[1]) this._value = value;};
Slider.prototype.check = function() {return this._value;};
/////////////////////////
function Button(value, name) {
	this.name = name;
	this.type = 'boolean';
	this._value = value=='true' ? true : false||false;
};
Button.prototype.valueSet = function() {this._value = !this._value};
Button.prototype.check = function() {return this._value};

function List(range, value, name) {
	this.name = name;
	this.type = 'list';
	this._range = range || ['0', '1', '2', '3', '4', '5'];
	this._value = value || 1;
};

List.prototype.valueSet = function(value) {
	if (value > 0 && this._value < this._range.length - 1) this._value++;
	if (value < 0 && this._value > 0) this._value--;
};
List.prototype.check = function() {return this._range[this._value];};

function SmartDev(name, dev) {
	this.name = name||'SmartDev';
	this._power = new Button(false, 'Power');
};

SmartDev.prototype.check = function() {return this._power.check();}
SmartDev.prototype.getInfo = function() {
	var res = {};
	var infoCtrl;
	for (var key in this) {
		if (typeof this[key] == 'object') {
			infoCtrl = this[key].check();
			res[this[key].name] = infoCtrl === true ? 'On': infoCtrl === false ? 'Off': infoCtrl;
			}
		}
	//console.log('info')
	//console.dir(res);
	return res;
};
