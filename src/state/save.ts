import { CLASSES, type ClassId } from '../data/classes';
import { PALETTE, type ColorId } from '../data/palette';
import { rollInitialAttributes } from '../game/systems/stats';
import type { Character } from '../game/entities/types';

const KEY = 'jogo-iso-accounts';
const ATTRS = ['attackPower', 'physique', 'luck', 'tenacity'];
const USERNAME_RE = /^[\p{L}\p{N}_]{2,16}$/u;

export interface Account {
  username: string;
  salt: string;       // aleatório, único por conta
  hash: string;       // senha após PBKDF2
  character: Character;
}
interface Store { version: 1; accounts: Record<string, Account> }
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

/* ---------- hash da senha (Web Crypto) ---------- */
const toHex = (buf: ArrayBuffer | Uint8Array) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const fromHex = (hex: string) => new Uint8Array(hex.match(/../g)!.map((h) => parseInt(h, 16)));

async function hashPassword(password: string, saltHex: string) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: fromHex(saltHex), iterations: 100_000, hash: 'SHA-256' }, key, 256
  );
  return toHex(bits);
}

/* ---------- leitura e escrita validadas ---------- */
function isValidAccount(a: any): a is Account {
  const c = a?.character;
  const at = c?.attributes;
  return (
    typeof a?.username === 'string' && typeof a?.salt === 'string' && typeof a?.hash === 'string' &&
    typeof c?.name === 'string' && c.classId in CLASSES && c.colorId in PALETTE &&
    !!at && ATTRS.every((k) => typeof at[k] === 'number')
  );
}

function readStore(): Store {
  const empty: Store = { version: 1, accounts: {} };
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : null;
    if (data?.version !== 1) return empty;
    const accounts: Record<string, Account> = {};
    for (const [k, v] of Object.entries(data.accounts ?? {})) {
      if (isValidAccount(v)) accounts[k] = v;      // contas corrompidas são ignoradas
    }
    return { version: 1, accounts };
  } catch {
    return empty;
  }
}

const writeStore = (s: Store) => localStorage.setItem(KEY, JSON.stringify(s));
const keyOf = (username: string) => username.trim().toLowerCase(); // "Ana" e "ana" são a mesma conta

/* ---------- API pública ---------- */
export function validateCredentials(username: string, password: string): string | null {
  if (!USERNAME_RE.test(username.trim())) return 'Usuário: 2 a 16 caracteres (letras, números ou _).';
  if (password.length < 4) return 'Senha: mínimo de 4 caracteres.';
  return null;
}

export async function registerAccount(
  username: string, password: string, classId: ClassId, colorId: ColorId
): Promise<Result<Character>> {
  const invalid = validateCredentials(username, password);
  if (invalid) return { ok: false, error: invalid };

  const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
  const hash = await hashPassword(password, salt);

  const store = readStore();                      // lê DEPOIS do await, para não pisar em outra escrita
  const key = keyOf(username);
  if (store.accounts[key]) return { ok: false, error: 'Esse usuário já existe.' };

  const character: Character = {
    name: username.trim(), classId, colorId, attributes: rollInitialAttributes(), // rola UMA vez
  };
  store.accounts[key] = { username: character.name, salt, hash, character };
  writeStore(store);
  return { ok: true, value: character };
}

export async function loginAccount(username: string, password: string): Promise<Result<Character>> {
  const fail = { ok: false as const, error: 'Usuário ou senha incorretos.' }; // não revela qual dos dois errou
  const acc = readStore().accounts[keyOf(username)];
  if (!acc) return fail;
  const hash = await hashPassword(password, acc.salt);
  return hash === acc.hash ? { ok: true, value: acc.character } : fail;
}

// Para o futuro: chamar ao subir de nível, ganhar XP etc.
export function saveCharacter(character: Character) {
  const store = readStore();
  const acc = store.accounts[keyOf(character.name)];
  if (!acc) return;
  acc.character = character;
  writeStore(store);
}