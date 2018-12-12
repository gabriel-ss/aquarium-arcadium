const sketch = require("./sketch");
const framework = require("./framework");
const telegram = require("./telegram");
const EventEmitter = require("./event-emitter");


const aquariumState = new EventEmitter();

sketch.state = aquariumState;


aquariumState.timers = [

	async() => {

		while (true) {

			aquariumState.sensors.updateState();
			await new Promise(resolve => setTimeout(resolve, 60000));

		}

	},

];

aquariumState.sensors = {
	waterLevel: 0,
	waterTemperature: 0,
	ambientTemperature: 0,
	async updateState() {

		try {

			[this.waterLevel, this.waterTemperature, this.ambientTemperature] =
			await Promise.all([
				telegram.getWaterLevel(),
				telegram.getWaterTemperature(),
				telegram.getAmbientTemperature(),
			]);
			aquariumState.dispatchEvent(new Event("sensorsrefreshed"));

		} catch (e) {

			aquariumState.dispatchEvent(new Event("failedrefresh"));

		}

	},

};

aquariumState.actuators = {
	light: false,
	waterPump: false,
	airPump: false,

	async updateState() {

		try {

			[this.light, this.waterPump, this.airPump] =
			(await Promise.all([
				telegram.getLightState(),
				telegram.getWaterPumpState(),
				telegram.getAirPumpState(),
			])).map(state => state === "on");
			aquariumState.dispatchEvent(new Event("sensorsrefreshed"));

		} catch (e) {

			aquariumState.dispatchEvent(new Event("failedrefresh"));

		}


	},

	toggleLight() {

		telegram.toggleLight()
			.then(() => aquariumState.actuators.light ^= true)
			.then(() => aquariumState.dispatchEvent(new Event("sensorsrefreshed")))
			.catch(() => aquariumState.dispatchEvent(new Event("failedcommand")));

	},

	toggleWaterPump() {

		telegram.toggleWaterPump()
			.then(() => aquariumState.actuators.waterPump ^= true)
			.then(() => aquariumState.dispatchEvent(new Event("sensorsrefreshed")))
			.catch(() => aquariumState.dispatchEvent(new Event("failedcommand")));

	},

	toggleAirPump() {

		telegram.toggleAirPump()
			.then(() => aquariumState.actuators.airPump ^= true)
			.then(() => aquariumState.dispatchEvent(new Event("sensorsrefreshed")))
			.catch(() => aquariumState.dispatchEvent(new Event("failedcommand")));

	},

	pumpFood() {

		telegram.pumpFood()
			.catch(() => aquariumState.dispatchEvent(new Event("failedcommand")));

	},

};


aquariumState.addEventListener("failedrefresh",
	() =>	framework("#error-modal")[0].show());

aquariumState.addEventListener("sensorsrefreshed", () => {

	const [temperatureIcon, pumpIcon, lightIcon] =
		document.querySelectorAll(".item-icon");
	const [, pumpContent, lightContent] =
		document.querySelectorAll(".item-content");

	temperatureIcon.childNodes[2]
		.replaceWith(` ${aquariumState.sensors.waterTemperature}`);

	// TODO: Find an icon to represent the OFF state
	pumpIcon.children[0].classList.replace(...aquariumState.actuators.airPump
		? ["fas", "fas"] : ["fas", "fas"]);
	lightIcon.children[0].classList.replace(...aquariumState.actuators.light
		? ["fas", "far"] : ["far", "fas"]);

	pumpContent.innerText =
		`The air pump is ${aquariumState.actuators.airPump ? "on" : "off"}`;
	lightContent.innerText =
		`The light in the aquarium is ${aquariumState.actuators.light ? "on" : "off"}`;

});

{

	const buttons = document.querySelectorAll("#button-panel button");
	const togglers = [
		aquariumState.actuators.pumpFood,
		aquariumState.actuators.toggleAirPump,
		aquariumState.actuators.toggleLight,
	];

	buttons.forEach((button, index) =>
		button.addEventListener("click", togglers[index]));

}

aquariumState.actuators.updateState();
aquariumState.timers.forEach(timer => timer());
