export type ColorId = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'black';

export interface ColorDef {
    id: ColorId,
    label: string,
    value: number
}

export const PALETTE: Record<ColorId, ColorDef> = {
    blue: {
        id: 'blue',
        label: 'Azul',
        value: 0x12748C,
    },
    red: {
        id: 'red',
        label: 'Vermelho',
        value: 0xFF0000,
    },
    green: {
        id: 'green',
        label: 'Verde',
        value: 0x70A608
    },
    yellow: {
        id: 'yellow',
        label: 'Amarelo',
        value: 0xF0EA10
    },
    purple: {
        id: 'purple',
        label: 'Roxo',
        value: 0xD22DB6
    },
    black: {
        id: 'black',
        label: 'Preto',
        value: 0x000000
    }
}

export const DEFAULT_COLOR: ColorId = 'blue';

// 0x12748C (pixi) -> #12748c (CSS)
export const cssColor = (n: number) => `#${n.toString(16).padStart(6, '0')}`;