import Component from "./component.js";


/**
 * Spinner module
 * @module Spinner
 */
const Spinner = (() => {

	const Spinner = function(element) {

		Component.call(this, "spinner", element);

	};


	Spinner.selector = ".spinner";


	Spinner.prototype = {
		show: () => {

		},
		hide: () => {

		},
		append: () => {

		},
		exclude: () => {

		},

	};

	return Spinner;

})();

export default Spinner;
