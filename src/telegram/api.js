import {BOT_TOKEN, CHAT_ID} from "../config.js";


const BASE_URL = "https://api.telegram.org/bot";

function getUpdates() {

	const request = new Request(`${BASE_URL}${BOT_TOKEN}/getUpdates`);

	return fetch(request).then(response => response.json());

}

function sendMessage(message) {

	const request = new Request(
		`${BASE_URL}${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`
	);

	return fetch(request).then(response => response.json());

}

export {getUpdates, sendMessage};
