export const TILE_W = 64;
export const TILE_H = 32;

export const gridToScreen = (x: number, y: number) => ({
    sx: (x- y) * TILE_W / 2,
    sy: (x + y) * TILE_H /2
});

export const screenToGrid = (sx: number, sy: number) => ({
    x: Math.round((sx / (TILE_W / 2) + sy / (TILE_H / 2)) / 2),
    y: Math.round((sy / (TILE_H / 2) - sx / (TILE_W / 2)) / 2)
})