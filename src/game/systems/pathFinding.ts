import Easystar from 'easystarjs';
import type { Grid } from '../world/Grid';
import type { Entity } from '../entities/types';

export function createPathFinder(grid: Grid) {
    const finder = new Easystar.js();
    finder.setGrid(grid.cells);
    finder.setAcceptableTiles([0]);
    finder.enableDiagonals();
    finder.disableCornerCutting();

    return {
        request(e: Entity, tx: number, ty: number) {
            finder.findPath(Math.round(e.x), Math.round(e.y), tx, ty, (path) => {
                if (path) e.path = path.slice(1); // descarta o tile onde já está;
            });
        },
        update() {
            finder.calculate(); // O EasyStar só processa quando isso é chamdado;
        },
    };
}