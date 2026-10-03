import { useAppStore } from './state/appStore';
import { MainMenu } from './ui/MainMenu';
import { GameScreen } from './ui/GameScreen';
import { AuthScreen } from './ui/auth/AuthScreen';

export default function App() {
  // Lê a tela atual do estado do app.
  const screen = useAppStore((s) => s.screen);

  return screen === 'game' ? <GameScreen /> : <AuthScreen />;

  // Comportamento padrão: menu.
  return <MainMenu />;
}