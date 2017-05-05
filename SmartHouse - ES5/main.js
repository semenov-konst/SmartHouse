'use strict'

var creater = new Creater(); //создание генератора устройств
creater.init(devList); //инъекция списка устройств в генератор
var model = new Model(); //создание модели
model.init(creater);		//инъекция генератора в модель 
var control = new Control(model); //создание контроллера с инъекцией модели
control.monitor(); //запуск мониторинга


