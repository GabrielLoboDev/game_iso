import { useState } from 'react';
import { useAppStore } from '../../state/appStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';

export function LoginForm() {
  const login = useAppStore((s) => s.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const err = await login(username, password);
    setLoading(false);
    if (err) setError(err);               // se deu certo, a tela troca sozinha para o jogo
  };

  return (
   <Panel variant='default' className='w-[20rem]'>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <Input value={username} onChange={(e) => setUsername(e.target.value)}
              placeholder="Username" autoComplete="username" />

        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
             placeholder="Password" autoComplete="current-password" />
              {error && <p className="text-sm text-red-400">{error}</p>}

        <span className='self-center font-mono text-font-black cursor-pointer hover:text-font-red'>Esqueceu a senha?</span>

        <Button variant='green' font='mono' className='w-[100%] h-[2.5rem]'>
          {loading ? 'Entrando...' : 'LOGIN'}
        </Button>
      </form>
   </Panel>
  );
}