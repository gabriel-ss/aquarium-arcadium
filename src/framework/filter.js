import Component from "./component.js";


/**
 * Filter module
 * @module filter
 */
const Filter = (() => {

	const Filter = function(element) {

		Component.call(this, "filter", element);

		this._targets = document.getElementById(
			element.getAttribute("data-filter-target")
		).children;

		element.addEventListener("keyup", () => this.filterElements());

	};


	Filter.selector = ".filter";


	Filter.prototype = {

		filterElements() {

			for (let i = 0; i < this._targets.length; i++) {

				this._targets[i].classList[
					this._targets[i].innerText.includes(this.element.value)
						? "remove" : "add"
				]("ocult");

			}

		},

	};

	return Filter;

})();

export default Filter;
