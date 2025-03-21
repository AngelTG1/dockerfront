interface LevelCardProps {
    level: number;
    onClick: (level: number) => void;
    isLocked: boolean;
  }
  
  const LevelCard: React.FC<LevelCardProps> = ({ level, onClick, isLocked }) => {
    return (
      <div
        onClick={() => onClick(level)}
        className={`cursor-pointer p-6 rounded-lg shadow-lg transition-all ${
          isLocked ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <h2 className="text-xl font-semibold">Nivel {level}</h2>
        <p className="mt-2">
          {isLocked ? `Completa el nivel anterior para desbloquear este nivel.` : `Haz click para comenzar el nivel ${level}.`}
        </p>
      </div>
    );
  };
  
  export default LevelCard;
  