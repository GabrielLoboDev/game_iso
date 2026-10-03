import { useAppStore } from '../state/appStore';
import { CLASSES } from '../data/classes';

export function MainMenu() {
  const { character, goTo, resetSave } = useAppStore();
  const cls = character ? CLASSES[character.classId] : undefined;

  const newGame = () => {
    if (character && !confirm('Já existe um personagem salvo. Começar um novo apagará o atual. Continuar?')) return;
    resetSave();
    goTo('create');
  };

  return (
    <div className="screen">
      <h1>Jogo Iso</h1>
      {character && cls && (
        <button onClick={() => goTo('game')}>
          Continuar ({character.name}, {cls.label})
        </button>
      )}
      <button onClick={newGame}>Novo jogo</button>
    </div>
  );
}