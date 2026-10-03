import { useState } from 'react';
import { Button } from '../components/Button';
import { LoginForm } from './LoginForm';
import { CreateCharacter } from './CreaterCharacter';

export function AuthScreen() {
  const [creating, setCreating] = useState(false);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 gap-4">
      <Button variant="orange" font='anton' className='w-[20rem] h-[3.5rem] text-[22px]' onClick={() => setCreating((v) => !v)}>
          {creating ? 'Já tenho conta' : 'Novo aqui?'}
      </Button>

      <div className="flex flex-col gap-4">
        {creating ? <CreateCharacter /> : <LoginForm />}
      </div>
    </main>
  );
}