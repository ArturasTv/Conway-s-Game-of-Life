import type p5 from "p5";

type CellState = "alive" | "dead";

class Cell {
	p: p5;

	x: number;
	y: number;
	size: number;
	state: CellState;

	constructor(
		p: p5,
		cell: {
			x: number;
			y: number;
			size: number;
		},
	) {
		const { x, y, size } = cell;

		this.x = x;
		this.y = y;
		this.size = size;

		this.p = p;

		this.state = "dead";
	}

	setState(state: CellState) {
		this.state = state;
	}

	getAliveNeighbours(cells: Cell[][]): Cell[] {
		const neighbours: Cell[] = [];

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;

				const x = this.x + i;
				const y = this.y + j;

				if (x >= 0 && x < cells.length && y >= 0 && y < cells[0].length) {
					const neighbour = cells[x][y];
					if (neighbour.state === "alive") {
						neighbours.push(neighbour);
					}
				}
			}
		}

		return neighbours;
	}

	evolution(cells: Cell[][]) {
		const neighbours = this.getAliveNeighbours(cells);

		if (this.state === "dead") {
			if (neighbours.length === 3) {
				this.state = "alive";
			}
			return;
		}

		if (neighbours.length < 2) {
			this.state = "dead";
		}

		if (neighbours.length === 2 || neighbours.length === 3) {
			this.state = "alive";
		}

		if (neighbours.length > 3) {
			this.state = "dead";
		}
	}

	update(cells: Cell[][]) {
		this.evolution(cells);
	}

	show() {
		const color =
			this.state === "alive"
				? this.p.color("#FF6500")
				: this.p.color("#1E3E62");

		this.p.fill(color);

		this.p.noStroke();
		this.p.square(this.x * this.size, this.y * this.size, this.size);
	}
}

export default Cell;
