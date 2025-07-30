import React from "react";
import type { Cell } from "../types/game";
import "./GameCell.css";

interface GameCellProps {
  value: Cell;
  isNew?: boolean;
}

export const GameCell: React.FC<GameCellProps> = ({ value, isNew = false }) => {
  const getCellClass = () => {
    let className = "game-cell";

    if (value !== null) {
      className += ` game-cell--${value}`;
    }

    if (isNew) {
      className += " game-cell--new";
    }

    return className;
  };

  return (
    <div className={getCellClass()}>
      {value !== null && <span className="game-cell__value">{value}</span>}
    </div>
  );
};
