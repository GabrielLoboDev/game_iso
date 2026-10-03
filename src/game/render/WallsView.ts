import { Container, Graphics } from 'pixi.js';
import { TILE_W, TILE_H } from '../iso/projection';

export const WALL_HEIGHT = 96;

const LEFT_WALL_COLOR = 0x5c5c8a;
const RIGHT_WALL_COLOR = 0x47476e;
const WALL_OUTLINE_COLOR = 0x55557a;

interface Point {
  x: number;
  y: number;
}

// Face vertical que vai de startPoint até endPoint, subindo WALL_HEIGHT pixels.
function createWallFace(startPoint: Point, endPoint: Point, fillColor: number) {
  return new Graphics()
    .poly([
      startPoint.x, startPoint.y,
      endPoint.x, endPoint.y,
      endPoint.x, endPoint.y - WALL_HEIGHT,
      startPoint.x, startPoint.y - WALL_HEIGHT,
    ])
    .fill(fillColor)
    .stroke({ width: 1, color: WALL_OUTLINE_COLOR });
}

export class WallsView extends Container {
  constructor(columnCount: number, rowCount: number) {
    super();

    // Vértice superior do tile (0, 0): onde as duas paredes se encontram.
    const cornerPoint: Point = { x: 0, y: -TILE_H / 2 };

    // Fim da borda superior direita (tile [columnCount - 1, 0], vértice direito).
    const rightWallEndPoint: Point = {
      x: (columnCount * TILE_W) / 2,
      y: ((columnCount - 1) * TILE_H) / 2,
    };

    // Fim da borda superior esquerda (tile [0, rowCount - 1], vértice esquerdo).
    const leftWallEndPoint: Point = {
      x: -(rowCount * TILE_W) / 2,
      y: ((rowCount - 1) * TILE_H) / 2,
    };

    this.addChild(
      createWallFace(cornerPoint, leftWallEndPoint, LEFT_WALL_COLOR),
      createWallFace(cornerPoint, rightWallEndPoint, RIGHT_WALL_COLOR)
    );
  }
}