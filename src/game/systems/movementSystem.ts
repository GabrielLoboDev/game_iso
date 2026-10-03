import type { Entity } from '../entities/types';

export function movementSystem(e: Entity, dt: number) {
    const target = e.path[0];
    if (!target) return;

    const dx = target.x -e.x;
    const dy = target.y - e.y;
    const distance = Math.hypot(dx, dy);
    const step = e.speed * dt;

    if (distance < step) {
        e.x = target.x;
        e.y = target.y;
        e.path.shift();
    } else {
        e.x += (dx / distance) * step;
        e.y += (dy / distance) * step;
    }
}