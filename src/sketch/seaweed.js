import p5 from "./sketch.js";


const SEAWEED_COLOR = "#4db151";
const SEAWEED_THICKNESS = 7;
const FRAMES_PER_CICLE = 480;


const Seaweed = (() => {

	const Seaweed = function(leafs, x, y, width, height) {

		this.leafs = leafs;
		this.position = [x, y];
		this.width = width;
		this.height = height;
		this.frame = Math.floor(Math.random() * FRAMES_PER_CICLE);

	};

	Seaweed.prototype = {
		draw() {

			const phi1 = Math.sin(this.frame * 2 * 3.14 / FRAMES_PER_CICLE);
			const phi2 = Math.sin((this.frame * 2 * 3.14 / FRAMES_PER_CICLE) +
				(3 * Math.PI / 2));

			p5.noFill();
			p5.strokeWeight(SEAWEED_THICKNESS);
			p5.stroke(SEAWEED_COLOR);
			for (let i = -1; i <= 1; i += 2 / (this.leafs - 1)) {

				p5.bezier(
					this.position[0] + (this.width * phi2 * i * 0.8),
					this.position[1] - (this.height + (phi1 * 10)),
					this.position[0] + (this.width * phi2 * 0.4),
					this.position[1] - (this.height * 0.8),
					this.position[0] + (this.width * phi1 * i),
					this.position[1] - (this.height * 0.5),
					...this.position
				);

			}
			this.frame++;
			this.frame %= FRAMES_PER_CICLE;

		},
	};


	return Seaweed;

})();

export default Seaweed;
