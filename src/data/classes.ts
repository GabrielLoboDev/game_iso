export type ClassId = 'attacker' | 'villain'  | 'tactical';

export interface Attributes {
    attackPower: number;
    physique: number;
    luck: number;
    tenacity: number;
}

export interface ClassDef {
    id: ClassId;
    label: string;
    description: string;
    speed: number;
    growth: Record<keyof Attributes, number>; // Multiplicador do gamho por nível;
}

export const CLASSES: Record<ClassId, ClassDef> = {
    attacker: {
        id: 'attacker',
        label: 'atacante',
        speed: 3,
        description: 'Resistente e durável, mas com o dano reduzido.',
        growth: {
            attackPower: 0.8,
            physique: 1.3,
            luck: 1,
            tenacity: 1.3
        }
    },
    villain: {
        id: 'villain',
        label: 'Vilão',
        speed: 3,
        description: 'Equilibrado, evolui em todos os atributos',
        growth: {
            attackPower: 1,
            physique: 1,
            luck: 1,
            tenacity: 1
        }
    },
    tactical: {
        id: 'tactical',
        label: 'Tático',
        speed: 3,
        description: 'Alto dano e crítico, mas com vida reduzida',
        growth: {
            attackPower: 1.3,
            physique: 0.8,
            luck: 1.3,
            tenacity: 1
        }
    }
}