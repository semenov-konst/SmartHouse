'use strict'

import {devList} from './devList';
import {Model} from './model';
import {Control} from './controler';
import {Creater} from './creater';
import {View} from './view';

let createrDev = new Creater(); //создание генератора устройств
createrDev.init(devList); //инъекция списка устройств в генератор
let model = new Model(); //создание модели
model.init(createrDev);		//инъекция генератора в модель 
let view = new View();
let control = new Control(model, view); //создание контроллера с инъекцией модели и вида
control.init(); //инициализация контроллера

