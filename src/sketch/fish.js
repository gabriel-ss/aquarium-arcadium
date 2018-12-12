import p5 from "./sketch.js";


const FISH_BASE_SIZE = [100, 70];
const LATERAL_MARGIN = 200;
const BOTTOM_MARGIN = 200;


const Fish = (() => {

	const Fish = function(image) {

		this.image = p5.loadImage(image);

		this.position = [
			Math.random() * p5.windowWidth,
			Math.random() * (p5.windowHeight - BOTTOM_MARGIN),
		];
		this.speed = Math.random() + 1;
		(Math.random() < 0.5) && (this.speed *= -1);

	};


	Fish.prototype = {

		draw() {

			const bounds = [p5.windowWidth, p5.windowHeight];

			this.position[0] = this.position[0] + this.speed;

			// When the fish passes the border of the screen up to a margin...
			if (this.position[0] <= -LATERAL_MARGIN ||
				this.position[0] >= bounds[0] + LATERAL_MARGIN) {

				// ...his moviment direction on x-axis is inverted...
				this.speed *= -1;
				// ...and he moves up or down a little
				this.position[1] +=
					Math.abs(
						(Math.random() * p5.windowWidth / 5) - (p5.windowWidth / 10)
					);
				(this.position[1] > p5.windowHeight - BOTTOM_MARGIN) &&
				(this.position[1] -= BOTTOM_MARGIN);

			}

			// If the speed is negative...
			if (this.speed <= 0) {

				// ...display an iverted image of the fish
				p5.translate(...this.position);
				p5.scale(-1, 1);
				p5.image(this.image, 0, 0, ...FISH_BASE_SIZE);
				p5.resetMatrix();

			} else p5.image(this.image, ...this.position, ...FISH_BASE_SIZE);


		},

	};


	return Fish;

})();

export default Fish;
