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
    </div>
  );
};
