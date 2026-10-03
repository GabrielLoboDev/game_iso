import { MENU_SLOTS, type MenuSlotDefinition, type MenuSlotGroup } from '../../data/menuSlots';
import { useHudStore } from '../../state/hudStore';
import { cn } from '../../lib/cn';

const GROUP_ORDER: MenuSlotGroup[] = ['start', 'center', 'end'];
const SLOT_SIZE_CLASS = 'size-9 sm:size-14';

export function MenuBar() {
  const activeMenuId = useHudStore((state) => state.activeMenuId);
  const isEventActive = useHudStore((state) => state.isEventActive);
  const toggleMenu = useHudStore((state) => state.toggleMenu);
  const closeMenu = useHudStore((state) => state.closeMenu);

  // Sem painel aberto, o jogador está no mundo (slot "Poderoso Chefão").
  const highlightedMenuId = activeMenuId ?? 'godfather';

  const handleSlotClick = (slot: MenuSlotDefinition) => {
    if (slot.id === 'godfather') closeMenu();
    else toggleMenu(slot.id);
  };

  const renderSlot = (slot: MenuSlotDefinition) => {
    const isHidden = slot.onlyDuringEvent && !isEventActive;

    // Reserva o espaço do slot para a barra continuar centralizada.
    if (isHidden) return <div key={slot.id} className={SLOT_SIZE_CLASS} aria-hidden />;

    const isActive = highlightedMenuId === slot.id;

    return (
      <button
        key={slot.id}
        type="button"
        title={slot.label}
        aria-label={slot.label}
        aria-pressed={isActive}
        onClick={() => handleSlotClick(slot)}
        className={cn(
          SLOT_SIZE_CLASS,
          'flex cursor-pointer items-center justify-center border-2 text-lg sm:text-2xl active:translate-y-0.5',
          isActive ? 'border-accent bg-white/10' : 'border-line bg-panel hover:bg-white/5',
          slot.onlyDuringEvent && 'animate-pulse border-orange'
        )}
      >
        {slot.icon}
      </button>
    );
  };

  return (
    <nav
      aria-label="Menu do jogo"
      className="fixed bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:gap-6"
    >
      {GROUP_ORDER.map((group) => (
        <div key={group} className="flex gap-0.5 sm:gap-1">
          {MENU_SLOTS.filter((slot) => slot.group === group).map(renderSlot)}
        </div>
      ))}
    </nav>
  );
}