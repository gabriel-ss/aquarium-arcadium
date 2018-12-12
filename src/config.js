/*
 * ------------------------------------------------------------------------
 * Telegram API
 * ------------------------------------------------------------------------
 */
export const BOT_TOKEN = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11";
export const CHAT_ID = "123456789";


/*
 * ------------------------------------------------------------------------
 * Telegram Commands
 * ------------------------------------------------------------------------
 */

// Sensors
export const GET_WATER_LEVEL_COMMAND = "/waterlevel";
export const WATER_LEVEL_PATTERN = /waterlevel: (\d+\.*\d*)/;
export const GET_WATER_TEMPERATURE_COMMAND = "/watertemperature";
export const WATER_TEMPERATURE_PATTERN = /watertemperature: (\d+\.*\d*)/;
export const GET_AMBIENT_TEMPERATURE_COMMAND = "/ambienttemperature";
export const AMBIENT_TEMPERATURE_PATTERN = /ambienttemperature: (\d+\.*\d*)/;

// Actuators
export const GET_LIGHT_STATE_COMMAND = "/light";
export const LIGHT_STATE_PATTERN = /light: (on|off)/;
export const GET_WATER_PUMP_STATE_COMMAND = "/waterpump";
export const WATER_PUMP_STATE_PATTERN = /waterpump: (on|off)/;
export const GET_AIR_PUMP_STATE_COMMAND = "/airpump";
export const AIR_PUMP_STATE_PATTERN = /airpump: (on|off)/;

export const TOGGLE_LIGHT_COMMAND = "/togglelight";
export const TOGGLE_WATER_PUMP_COMMAND = "/togglewaterpump";
export const TOGGLE_AIR_PUMP_COMMAND = "/toggleairpump";
export const PUMP_FOOD_COMMAND = "/pumpfood";
