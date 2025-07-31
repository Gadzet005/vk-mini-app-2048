import React from "react";
import "./ScoreBoard.css";

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className="score-board">
      <div className="score-board__item">
        <div className="score-board__label">Счёт</div>
        <div className="score-board__value">{score}</div>
      </div>
      <div className="score-board__item">
        <div className="score-board__label">Лучший</div>
        <div className="score-board__value">{bestScore}</div>
      </div>
    </div>
  );
};
