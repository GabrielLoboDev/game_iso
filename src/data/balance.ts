export const DAMAGE_PER_ATTACK = 5; // 25 de Força -> 125 de Dano;
export const HP_PER_PHYSIQUE = 19.2;    // 25 de Físico -> 480 de Vida;

export const CRIT_CAP = 0.5;    // máximo de 50%
export const RESIST_CAP = 0.5;  // máximo de 50%
export const RATIO_MULTIPLIER = 1;  // chance = (stat / base) * multiplicador

// Estado incial (rolagem na criação do personagem)
export const INTIAL_ATTACK_RANGE = [20, 30] as const;
export const INITIAL_PHYSIQUE_RANGE = [20, 30] as const;
export const INITIAL_LUCK_RATIO = 0.5; // Sorte = 50% da Força
export const INITIAL_TENACITY_RATIO = 0.5; // Tenacidade = 50% do Físico 

// Ganho base por nível (multiplicado pelo "growth" de cada classe)
export const BASE_GROWTH = {attackPower: 2, physique: 2, luck: 1, tenacity: 1};