'use strict'
/////////////////////
//////deviceList/////
/////////////////////
var devList = {
	[0]: {
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
						}
		}
	},
	[1]: {
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
	[2]: {
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
						range: [0, 5],
						value: 0,
						name: 'Zoom'
						}
		
		}
	}
};
