import React from "react";
import "./GameControls.css";

interface GameControlsProps {
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onRestart }) => {
  return (
    <div className="game-controls">
      <button className="game-controls__button" onClick={onRestart}>
        Новая игра
      </button>
      <div className="game-controls__instructions">
        <p>Используйте стрелки, WASD или свайпы для перемещения плиток</p>
        <p>
          Объединяйте числа для достижения <strong>2048</strong>!
        </p>
      </div>
    </div>
  );
};
