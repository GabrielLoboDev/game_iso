export class Grid {
    cells: number[][]; // 0 = livre, 1 =bloqueado (indexado como cells[y][x]);

    constructor(public cols: number, public rows: number) {
        this.cells = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    inBounds(x: number, y: number) {
        return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
    }

    isWalkable(x: number, y: number) {
        return this.inBounds(x, y) && this.cells[x][y] === 0;
    }
}