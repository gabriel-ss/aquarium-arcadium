const framework = require("./framework");
const EventEmitter = require("./event-emitter");


const aquariumState = new EventEmitter();
aquariumState.sensors = {
	waterLevel: 0,
	waterTemperature: 0,
	ambientTemperature: 0,
};

aquariumState.actuators = {
	light: false,
	waterPump: false,
	airPump: false,
};
