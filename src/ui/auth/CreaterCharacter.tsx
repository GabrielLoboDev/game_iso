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
import { OrderPlace } from '../components/OrderPlace';

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
    <form onSubmit={submit} className="flex flex-row gap-2">
      {/* Container 1: prévia e cor */}
      <Panel className="h-[20rem] w-[18rem] flex flex-col justify-center items-center">
        <div className="h-[99%] w-[99%] bg-bg rounded flex flex-col justify-center items-center">
          <AvatarPreview color={PALETTE[colorId].value} name={username.trim() || 'Seu nome'} />
        </div>
      </Panel>

      {/* Container 2: classe, credenciais e salvar */}
      <div className='w-[18rem] flex flex-col gap-2'>
        <OrderPlace
          numberPlace={1}
          label="Classe"
        >
          {Object.values(CLASSES).map((c) => (
            <Button
              key={c.id}
              variant='blue'
              font='mono'
              onClick={() => setClassId(c.id)}
              className={cn(classId === c.id ? 'border-orange' : 'border-border-gray')}
            >
              {c.label}
            </Button>
          ))}
        </OrderPlace>

        <OrderPlace
        numberPlace={2}
        label="Aparência"
        >
          <ColorPicker value={colorId} onChange={setColorId} />
        </OrderPlace>

        <Panel className="flex flex-col gap-3">
          <Input value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (2 a 16)" maxLength={16} autoComplete="username" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (mín. 4)" autoComplete="new-password" />

          {error && <p className="text-sm text-red-400">{error}</p>}
        </Panel>

        <Button variant="orange" font='anton' className='w-[18rem] h-[3rem] text-[22px]'>
            {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}