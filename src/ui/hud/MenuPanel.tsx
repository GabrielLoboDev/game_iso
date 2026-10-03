import { useEffect } from 'react';
import { MENU_SLOTS } from '../../data/menuSlots';
import { useHudStore } from '../../state/hudStore';
import { Button } from '../components/Button';
import { Panel } from '../components/Panel';

export function MenuPanel() {
  const activeMenuId = useHudStore((state) => state.activeMenuId);
  const closeMenu = useHudStore((state) => state.closeMenu);

  useEffect(() => {
    if (!activeMenuId) return;
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMenuId, closeMenu]);

  if (!activeMenuId) return null; // depois dos hooks, nunca antes

  const slot = MENU_SLOTS.find((menuSlot) => menuSlot.id === activeMenuId);
  if (!slot) return null;

  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-20 z-10 flex items-center justify-center bg-black/50 p-4"
      onClick={closeMenu}
    >
      <Panel className="w-full max-w-md" onClick={(clickEvent) => clickEvent.stopPropagation()}>
        <header className="mb-4 flex items-center justify-between">
          <h2 className="font-anton text-2xl">
            {slot.icon} {slot.label}
          </h2>
          <Button variant="gray" className="w-8" onClick={closeMenu} aria-label="Fechar">
            X
          </Button>
        </header>
        <p className="opacity-80">Em breve.</p>
      </Panel>
    </div>
  );
}