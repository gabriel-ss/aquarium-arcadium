const EventEmitter = (() => {

	const EventEmitter = function() {

		this.eventRegistry = new Map();

	};

	EventEmitter.prototype = {

		addEventListener(eventName, callback) {

			(this.eventRegistry.get(eventName) ||
				this.eventRegistry.set(eventName, []).get(eventName)
			).push(callback);

		},

		removeEventListener(eventName, callback) {

			let callbacks = this.eventRegistry.get(eventName) || [];

			callbacks = callbacks.filter(registeredCallback =>
				registeredCallback === callback);

		},

		dispatchEvent(eventObject) {

			(this.eventRegistry.get(eventObject.type) || [])
				.forEach(callback => void callback(eventObject));

		},

	};

	return EventEmitter;

})();


module.exports = EventEmitter;
