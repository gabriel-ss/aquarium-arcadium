import Background from "./background.js";
import Bubble from "./bubble.js";
import Fish from "./fish.js";
import Seaweed from "./seaweed.js";


const p5 = require("p5");


const aquariumSketch = new p5(p5 => {

	const NUMBER_OF_BUBLES = 35;
	const BACLGROUND_COLOR = "#1B9CFC";

	const bubbles = [];
	const fishes = [
		"./assets/fishes/fish1_colored.svg",
		"./assets/fishes/fish1_colored.svg",
		"./assets/fishes/fish1_colored.svg",
	];
	const background = [
		"./assets/gradient.svg",
		"./assets/sand.svg",
	];
	let lightOverlay = "./assets/light_overlay.png";
	const seaweed = [
		[5, p5.windowWidth * 0.13, p5.windowHeight * 0.88, p5.windowWidth * 0.075, p5.windowHeight * 0.2],
		[4, p5.windowWidth * 0.12, p5.windowHeight * 0.88, p5.windowWidth * 0.05, p5.windowHeight * 0.18],
		[4, p5.windowWidth * 0.2, p5.windowHeight * 0.9, p5.windowWidth * 0.05, p5.windowHeight * 0.1],
		[5, p5.windowWidth * 0.32, p5.windowHeight * 0.9, p5.windowWidth * 0.05, p5.windowHeight * 0.2],
		[5, p5.windowWidth * 0.35, p5.windowHeight * 0.9, p5.windowWidth * 0.05, p5.windowHeight * 0.15],
		[4, p5.windowWidth * 0.72, p5.windowHeight * 0.9, p5.windowWidth * 0.05, p5.windowHeight * 0.1],
		[5, p5.windowWidth * 0.75, p5.windowHeight * 0.9, p5.windowWidth * 0.05, p5.windowHeight * 0.2],
	];

	let sketchLayers;

	p5.setup = function() {

		p5.createCanvas(p5.windowWidth, p5.windowHeight);

		for (let i = 0; i < background.length; i++)
			background[i] = new Background(background[i]);
		for (let i = 0; i < NUMBER_OF_BUBLES; i++)
			bubbles[i] = new Bubble();
		for (let i = 0; i < fishes.length; i++)
			fishes[i] = new Fish(fishes[i]);
		for (let i = 0; i < seaweed.length; i++)
			seaweed[i] = new Seaweed(...seaweed[i]);

		lightOverlay = new Background(lightOverlay);
		lightOverlay.draw = function() {

			if (aquariumSketch.state.actuators.light)
				p5.image(this.image, 0, 0, p5.windowWidth, p5.windowHeight);

		};

		bubbles.draw = function() {

			const ratio = aquariumSketch.state.actuators.airPump ? 1 : 3;

			for (let i = 0; i < this.length / ratio; i++)
				this[i].draw();

		};

		sketchLayers = [
			...background,
			lightOverlay,
			bubbles,
			...fishes,
			...seaweed,
		];

	};

	p5.draw = function() {

		p5.background(BACLGROUND_COLOR);
		sketchLayers.forEach(layer => layer.draw());

	};

	p5.windowResized = function() {

		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

	};

});

export default aquariumSketch;
