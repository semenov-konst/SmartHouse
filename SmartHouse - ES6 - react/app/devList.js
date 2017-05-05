'use strict'
/////////////////////
//////deviceList/////
/////////////////////

export let devList = {
	dev1: {
		type: 'TV',
		control: {
			_mute:		{type: 'boolean',
						value: 'false',
						name: 'Mute'
						},
			_volume:	{type: 'range',
						range: [0, 100],
						value: 15,
						name: 'Volume'
						},
			_channel:	{type: 'list', 
						range: ['1+1', 'ICTV', 'STB', 'M1', 'ORT', 'Kultura'], 
						value: 1,
						name: 'Channel'
						},
			_brightness: {type: 'range',
						range: [0, 100],
						value: 50,
						name: 'Brightness'
						},
			_saturation: {type: 'range',
						range: [0, 100],
						value: 50,
						name: 'Saturation'
						},			
			_HUE: 		{type: 'range',
						range: [0, 100],
						value: 50,
						name: 'HUE'
						}
		}
	},
	dev2: {
		type: 'Player',
		control: {
			_mute:		{type: 'boolean',
						value: 'false',
						name: 'Mute'
						},
			_volume:	{type: 'range',
						range: [0, 100],
						value: 15,
						name: 'Volume'
						},
			_track:		{type: 'list', 
						range: ['Zolotie kupala', 'Marsh Slavyanki', 'Du Hast', 'Reklama', 'Happy Birthday', 'Lalala'], 
						value: 1,
						name: 'Track'
						}
		}
	},
	dev3: {
		type: 'SecureCam',
		control: {
			_mute:		{type: 'boolean',
						value: 'false',
						name: 'Mute'
						},
			_blackWihte:{type: 'boolean',
						value: 'false',
						name: 'Black/White mode'
						},
			_zoom:		{type: 'range',
						range: [1, 5],
						value: 1,
						name: 'Zoom'
						}
		
		}
	},
	dev4: {
		type: 'Radio',
		control: {
			_mute:		{type: 'boolean',
						value: 'false',
						name: 'Mute'
						},
			_volume:	{type: 'range',
						range: [0, 100],
						value: 15,
						name: 'Volume'
						},
			_station:	{type: 'list', 
						range: ['Russkoe radio', 'Lux FM', 'Hit FM', 'Retro'], 
						value: 1,
						name: 'Station'
						}
		
		}
	}
	/////////////Если расскоментировать строки ниже добавится еще устройство///////////////////

/*
	,
	devN: {
		type: 'Conditioner',
		control: {
			_temp:	{type: 'range',
						range: [15, 30],
						value: 25,
						name: 'Temperature'
						},
			_mode:		{type: 'list', 
						range: ['cold', 'hot', 'ventilation', 'dry'], 
						value: 1,
						name: 'Mode'
						}
		
		}
	}
*/	
};
