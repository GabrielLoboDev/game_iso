import { Application, Container, Graphics } from 'pixi.js';
import { gridToScreen, screenToGrid, TILE_W, TILE_H } from './iso/projection';
import { Grid } from './world/Grid';
import { AvatarView } from './render/AvatarView';
import { createPathFinder } from './systems/pathFinding';
import { movementSystem } from './systems/movementSystem';
import { CLASSES } from '../data/classes';
import type { Character, Entity } from './entities/types';
import { deriveStats } from './systems/stats';
import { PALETTE } from '../data/palette';

const COLS = 10;
const ROWS = 10;
const diamond = [0, -TILE_H / 2, TILE_W / 2, 0, 0, TILE_H / 2, -TILE_W / 2, 0];

export async function startGame(host: HTMLElement, character: Character) {
    const app = new Application();
    await app.init({ resizeTo: host, background: '#1B1B2F', antialias: false });
    host.appendChild(app.canvas);

    try {
        // Valida antes de desenhar qualquer coisa
        const cls = CLASSES[character.classId];
        const color = PALETTE[character.colorId]
        if (!cls || !character.attributes) {
            throw new Error(
                `Personagem inválido (classe: "${character.classId}"). Apague o save e crie outro.`
            );
        }

        const world = new Container();
        world.position.set(app.screen.width / 2, 80);
        app.stage.addChild(world);

        const grid = new Grid(COLS, ROWS);
        const pathFinder = createPathFinder(grid);

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const { sx, sy } = gridToScreen(x, y);
                const tile = new Graphics()
                    .poly(diamond).fill(0x3A3A5C).stroke({ width: 1, color: 0x55557A });
                tile.position.set(sx, sy);
                world.addChild(tile);
            }
        }

        // Marcador ANTES das entidades, para o personagem ficar por cima
        const marker = new Graphics().poly(diamond).fill({ color: 0xFFCC00, alpha: 0.6 });
        marker.visible = false;
        world.addChild(marker);

        // Container das entidades, ordenado por profundidade
        const entities = new Container();
        entities.sortableChildren = true;
        world.addChild(entities);

        // Personagem do jogador (dados + visual)
        const stats = deriveStats(character.attributes);
        const player: Entity = {
            id: 1,
            name: character.name,
            classId: character.classId,
            x: 5,
            y: 5,
            speed: cls.speed,
            attributes: character.attributes,   // corrigido
            path: [],
            hp: stats.maxHp,
        };
        const avatar = new AvatarView(color.value, character.name);
        entities.addChild(avatar);

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('pointerdown', (e) => {
            const p = world.toLocal(e.global);
            const { x, y } = screenToGrid(p.x, p.y);
            if (!grid.isWalkable(x, y)) return;

            const { sx, sy } = gridToScreen(x, y);
            marker.position.set(sx, sy);
            marker.visible = true;
            pathFinder.request(player, x, y);
        });

        app.ticker.add(({ deltaMS }) => {
            pathFinder.update();
            movementSystem(player, deltaMS / 1000);

            const { sx, sy } = gridToScreen(player.x, player.y);
            avatar.position.set(sx, sy);
            avatar.zIndex = player.x + player.y;
        });

        return app;
    } catch (err) {
        app.destroy(true, { children: true }); // não deixa canvas órfão
        throw err;
    }
}