import { CLASSES, type Attributes, type ClassId } from "../../data/classes";
import * as B from '../../data/balance';

export interface DeriveStats {
    damage: number; // Dano
    maxHp: number;  // Vida
    critChance: number //0 a 0.5;
    resistance: number  // a a 0.5;
}

const ratioChance = (stat: number, base: number, cap: number) => {
    base <= 0 ? 0 : Math.min(cap, (stat / base) * B.RATIO_MULTIPLIER);
}

export function deriveStats(a: Attributes, weaponDamage = 0): DeriveStats {
    return {
        damage: Math.round(a.attackPower * B.DAMAGE_PER_ATTACK) + weaponDamage,
        maxHp: Math.round(a.physique * B.HP_PER_PHYSIQUE),
        critChance: ratioChance(a.luck, a.attackPower, B.CRIT_CAP),
        resistance: ratioChance(a.tenacity, a.physique, B.RESIST_CAP)
    };
}

const rollInt = (min: number, max: number, rng: () => number) =>
    Math.floor(rng() * (max - min + 1)) + min;

export function rollInitialAttributes(rng: () => number = Math.random): Attributes {
    const attackPower = rollInt(...B.INTIAL_ATTACK_RANGE, rng);
    const physique = rollInt(...B.INITIAL_PHYSIQUE_RANGE, rng);
    return {
        attackPower,
        physique,
        luck: Math.round(attackPower * B.INITIAL_LUCK_RATIO),
        tenacity: Math.round(physique * B.INITIAL_TENACITY_RATIO),
    };
}

// Para a futura progressão: cada classe ganha mais em uns atributos que em outros não
export function applyLevellUp(a: Attributes, classId: ClassId): Attributes {
    const growth = CLASSES[classId].growth;
    const next = {...a};
    for (const k of Object.keys(a) as (keyof Attributes)[]) {
        next[k] = a[k] + B.BASE_GROWTH[k] * growth[k];
    }
    return next;
}