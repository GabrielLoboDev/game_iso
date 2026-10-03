import { cssColor } from '../../data/palette';

export function AvatarPreview({ color, name }: { color: number; name: string }) {
  return (
    <svg viewBox="0 0 120 160" className="h-48 w-36" role="img" aria-label="Prévia do personagem">
      <ellipse cx="60" cy="140" rx="28" ry="14" fill="#000" opacity="0.3" />
      <rect x="44" y="80" width="32" height="56" rx="6" fill={cssColor(color)} />
      <circle cx="60" cy="64" r="16" fill="#ffd9b3" />
      <text x="60" y="40" textAnchor="middle" fontSize="14" fill="#fff"
            stroke="#000" strokeWidth="3" paintOrder="stroke">{name}</text>
    </svg>
  );
}