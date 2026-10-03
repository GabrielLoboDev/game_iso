import { PALETTE, cssColor, type ColorId } from '../../data/palette';
import { cn } from '../../lib/cn';

interface Props { value: ColorId; onChange: (id: ColorId) => void }

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Cor do personagem">
      {Object.values(PALETTE).map((c) => (
        <button
          key={c.id}
          type="button"                       // importante: não envia o formulário
          role="radio"
          aria-checked={value === c.id}
          title={c.label}
          onClick={() => onChange(c.id)}
          style={{ background: cssColor(c.value) }}
          className={cn('h-8 w-8 border-2', value === c.id ? 'scale-110 border-white' : 'border-transparent')}
        />
      ))}
    </div>
  );
}