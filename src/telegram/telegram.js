import {getUpdates, sendMessage} from "./api.js";
import {
	GET_WATER_LEVEL_COMMAND,
	WATER_LEVEL_PATTERN,
	GET_WATER_TEMPERATURE_COMMAND,
	WATER_TEMPERATURE_PATTERN,
	GET_AMBIENT_TEMPERATURE_COMMAND,
	AMBIENT_TEMPERATURE_PATTERN,
	GET_LIGHT_STATE_COMMAND,
	LIGHT_STATE_PATTERN,
	GET_WATER_PUMP_STATE_COMMAND,
	WATER_PUMP_STATE_PATTERN,
	GET_AIR_PUMP_STATE_COMMAND,
	AIR_PUMP_STATE_PATTERN,
	TOGGLE_LIGHT_COMMAND,
	TOGGLE_WATER_PUMP_COMMAND,
	TOGGLE_AIR_PUMP_COMMAND,
	PUMP_FOOD_COMMAND,
} from "../config.js";


function parseData(pattern, messages, requisitionTime) {

	let value = null;

	for (let i = messages.result.length - 1, message; i >= 0; i--) {

		({message} = messages.result[i]);

		if (new Date(message.date * 1000) < requisitionTime) break;

		if (message.text.search(pattern) !== -1) {

			[, value] = message.text.match(pattern);
			break;

		}

	}

	return value;

}

function createGetter(requestCommand, responseTemplate) {

	return async() => {


		const requisitionTime = new Date();
		let messages;
		let response = null;

		await sendMessage(requestCommand);

		for (let i = 1; i <= 5; i++) {

			await new Promise(resolve => setTimeout(resolve, i * 1000));
			messages = await getUpdates();


			if (response =
				parseData(responseTemplate, messages, requisitionTime)) break;

		}

		if (response === null)
			throw new Error("Failed to retrieve info from the aquarium");

		return response;

	};

}

function createCommandSender(command) {

	return async() => {

		const result = await Promise.race([
			sendMessage(command),
			new Promise(resolve => setTimeout(() => resolve({ok: false}), 5000)),
		]);

		if (!result.ok)
			throw new Error("Failed to retrieve info from the aquarium");

	};

}

const infoRetrievers = [
	createGetter(GET_WATER_LEVEL_COMMAND, WATER_LEVEL_PATTERN),
	createGetter(GET_WATER_TEMPERATURE_COMMAND, WATER_TEMPERATURE_PATTERN),
	createGetter(GET_AMBIENT_TEMPERATURE_COMMAND, AMBIENT_TEMPERATURE_PATTERN),
	createGetter(GET_LIGHT_STATE_COMMAND, LIGHT_STATE_PATTERN),
	createGetter(GET_WATER_PUMP_STATE_COMMAND, WATER_PUMP_STATE_PATTERN),
	createGetter(GET_AIR_PUMP_STATE_COMMAND, AIR_PUMP_STATE_PATTERN),
];

const commandSenders = [
	createCommandSender(TOGGLE_LIGHT_COMMAND),
	createCommandSender(TOGGLE_WATER_PUMP_COMMAND),
	createCommandSender(TOGGLE_AIR_PUMP_COMMAND),
	createCommandSender(PUMP_FOOD_COMMAND),
];

export const [
	getWaterLevel,
	getWaterTemperature,
	getAmbientTemperature,
	getLightState,
	getWaterPumpState,
	getAirPumpState,
	toggleLight,
	toggleWaterPump,
	toggleAirPump,
	pumpFood,
] = [infoRetrievers, commandSenders].flat();
