import Component from "./component.js";


/**
 * View module
 * @module view
 */
const View = (() => {

	const View = function(element) {

		Component.call(this, "view", element);

		View.all.push(this);

	};

	View.all = [];


	View.selector = ".view";


	View.prototype = {

		displayView() {

			View.all.forEach(view => view.element
				.classList[view === this ? "add" : "remove"]("active"));

		},

	};

	return View;

})();

export default View;
