import p5 from "./sketch.js";


const Background = (() => {

	const Background = function(image) {

		this.image = p5.loadImage(image);

	};

	Background.prototype = {
		draw() {

			p5.image(this.image, 0, 0, p5.windowWidth, p5.windowHeight);

		},
	};


	return Background;

})();

export default Background;
