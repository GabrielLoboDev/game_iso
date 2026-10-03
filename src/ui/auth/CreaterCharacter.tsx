import { useState } from 'react';
import { CLASSES, type ClassId } from '../../data/classes';
import { DEFAULT_COLOR, PALETTE, type ColorId } from '../../data/palette';
import { useAppStore } from '../../state/appStore';
import { cn } from '../../lib/cn';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { AvatarPreview } from './AvatarPreview';
import { ColorPicker } from './ColorPicker';

export function CreateCharacter() {
  const register = useAppStore((s) => s.register);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [classId, setClassId] = useState<ClassId | null>(null);
  const [colorId, setColorId] = useState<ColorId>(DEFAULT_COLOR);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId) return setError('Escolha uma classe.');
    setError(null);
    setLoading(true);
    const err = await register(username, password, classId, colorId);
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      {/* Container 1: prévia e cor */}
      <Panel tone="dark" className="flex flex-col items-center gap-4">
        <AvatarPreview color={PALETTE[colorId].value} name={username.trim() || 'Seu nome'} />
        <ColorPicker value={colorId} onChange={setColorId} />
      </Panel>

      {/* Container 2: classe, credenciais e salvar */}
      <Panel tone="dark" className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {Object.values(CLASSES).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setClassId(c.id)}
              className={cn(
                'border-2 p-2 text-left',
                classId === c.id ? 'border-accent bg-white/10' : 'border-line hover:bg-white/5'
              )}
            >
              <strong>{c.label}</strong>
              <small className="block opacity-80">{c.description}</small>
            </button>
          ))}
        </div>

        <Input value={username} onChange={(e) => setUsername(e.target.value)}
               placeholder="Username (2 a 16)" maxLength={16} autoComplete="username" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Password (mín. 4)" autoComplete="new-password" />

        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</Button>
      </Panel>
    </form>
  );
}