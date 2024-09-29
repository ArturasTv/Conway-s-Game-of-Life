import type p5 from "p5";
import Cell from "./cell";

type GameState = "waiting" | "started";

const sketch = (p: p5) => {
	let gameState: GameState = "waiting";
	let startButton: p5.Element;

	const cells: Cell[][] = [];
	const cellSize = 32;

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.background(0);

		for (let i = 0; i < p.windowWidth / cellSize; i++) {
			cells[i] = [];
			for (let j = 0; j < p.windowHeight / cellSize; j++) {
				const cell = new Cell(p, {
					x: i,
					y: j,
					size: cellSize,
				});

				cells[i][j] = cell;
			}
		}

		startButton = createStartButton();
	};

	p.draw = () => {
		if (gameState === "started") {
			startButton.hide();
		}

		for (let i = 0; i < p.windowWidth / cellSize; i++) {
			for (let j = 0; j < p.windowHeight / cellSize; j++) {
				if (gameState === "started") {
					cells[i][j].update(cells);
				}
				cells[i][j].show();
			}
		}
	};

	p.mouseDragged = () => {
		if (gameState === "started") return;

		const x = p.floor(p.mouseX / cellSize);
		const y = p.floor(p.mouseY / cellSize);

		cells[x][y].setState("alive");
	};

	const createStartButton = () => {
		const button = p.createButton("Start");

		button.position(
			(p.windowWidth - button.width) / 2,
			(p.windowHeight - button.height) / 2,
		);

		button.mouseClicked(() => {
			gameState = "started";
		});

		return button;
	};
};

export default sketch;
