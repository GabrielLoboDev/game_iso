import { useEffect, useRef } from 'react';
import type { Application } from 'pixi.js';
import { startGame } from '../game/GameApp';
import { useAppStore } from '../state/appStore';

export function GameScreen() {
  const host = useRef<HTMLDivElement>(null);
  const character = useAppStore((s) => s.character);
  const logout = useAppStore((s) => s.logout);

  useEffect(() => {
    const el = host.current;
    if (!el || !character) return;           // sem div ou sem personagem: não inicia

    let app: Application | undefined;
    let cancelled = false;

    startGame(el, character)
      .then((a) => {
        if (cancelled) a.destroy(true, { children: true });
        else app = a;
      })
      .catch((err) => console.error('Erro ao iniciar o jogo:', err));

    return () => {
      cancelled = true;
      app?.destroy(true, { children: true });
    };
  }, [character]);

  if (!character) return null;               // depois dos hooks, nunca antes

  return (
    <>
      <div ref={host} style={{ width: '100vw', height: '100vh' }} />
      <button
        className="fixed left-3 top-3 border-2 border-line bg-black/40 px-3 py-1"
        onClick={logout}
      >
        Sair
      </button>
    </>
  );
}