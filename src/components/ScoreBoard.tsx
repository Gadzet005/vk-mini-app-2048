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
        <div className="score-board__value">
          {score.toLocaleString("ru-RU")}
        </div>
      </div>
      <div className="score-board__item">
        <div className="score-board__label">Лучший</div>
        <div className="score-board__value">
          {bestScore.toLocaleString("ru-RU")}
        </div>
      </div>
    </div>
  );
};
