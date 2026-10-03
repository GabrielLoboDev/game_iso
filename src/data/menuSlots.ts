export type MenuSlotId = 
    |   'tasks'
    |   'inventory'
    |   'godfather'
    |   'duel'
    |   'gangWar'
    |   'blackMarket'
    |   'family'
    |   'ranking'
    |   'events';

export type MenuSlotGroup = 'start' | 'center' | 'end';

export interface MenuSlotDefinition {
    id: MenuSlotId;
    label: string;
    icon: string; // Emoki por enquanto, depois trocar por pixelado;
    group: MenuSlotGroup;
    onlyDuringEvent?: boolean;
}

export const MENU_SLOTS: MenuSlotDefinition[] = [
    {
        id: 'tasks',
        label: 'Tasks',
        icon: '📋​',
        group: 'start',
    },
    {
        id: 'inventory',
        label: 'Inventário',
        icon: '📂​',
        group: 'center'
    },
    {
        id: 'godfather',
        label: 'Poderoso Chefão',
        icon: '🎩​',
        group: 'center'
    },
    {
        id: 'duel',
        label: 'Duelo',
        icon: '🔫',
        group: 'center'
    },
    {
        id: 'gangWar',
        label: 'Briga de Gangue',
        icon: '​🗺️​',
        group: 'center'
    },
    {
        id: 'blackMarket',
        label: 'Mercado Negro',
        icon: '🛒​',
        group: 'center'
    },
    {
        id: 'family',
        label: 'Fámilia',
        icon: '🤝​',
        group: 'center'
    },
    {
        id: 'ranking',
        label: 'Ranking',
        icon: '🎖️​',
        group: 'center'
    },
    {
        id: 'events',
        label: 'Evento',
        icon: '⭐​',
        group: 'end',
        onlyDuringEvent: true,
    }
]