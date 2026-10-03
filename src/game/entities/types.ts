import type { Attributes, ClassId } from "../../data/classes";
import type { ColorId } from "../../data/palette";

export interface Character {
    name: string; // username
    colorId: ColorId;
    classId: ClassId;
    attributes: Attributes; // rolados uma vez e salvos;
}

export interface Entity {
    id: number;
    name: string;
    classId?: ClassId;  // Inimigos não tem classe
    x: number;
    y: number;
    speed: number;
    path: { x: number; y: number; }[];
    attributes: Attributes;
    hp: number; // Vida atual (a máxima vem de deriveStats)
}