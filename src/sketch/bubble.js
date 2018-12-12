import p5 from "./sketch.js";


const BUBBLE_THICKNESS = 3;


const Bubble = (() => {

	const Bubble = function() {

		this.radius = 20 + (Math.random() * 20);
		this.color = 150 + (Math.random() * 80);

		this.position = [
			Math.random() * p5.windowWidth,
			Math.random() * p5.windowHeight,
		];
		this.velocity = [
			(Math.random() * 2) - 1,
			(Math.random() * 2) - 1,
		];

	};

	Bubble.prototype = {

		draw() {

			const bounds = [p5.windowWidth, p5.windowHeight];

			// For each component of the position vector...
			for (let i = 0; i < this.position.length; i++) {

				// ...update the position and if the position is greater than the
				// size of the screen...
				this.position[i] =
					(this.position[i] + this.velocity[i]) % bounds[i];

				// ...or lesset than zero make the bubble apear in the oposite side
				// of the screen
				if (this.position[i] <= 0) this.position[i] = bounds[i];

			}


			p5.ellipseMode(p5.CENTER);
			p5.noFill();
			p5.stroke(this.color);
			p5.strokeWeight(BUBBLE_THICKNESS);
			p5.ellipse(...this.position, this.radius);

		},

	};


	return Bubble;

})();

export default Bubble;
