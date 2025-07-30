import React from "react";
import type { Board } from "../types/game";
import { GameCell } from "./GameCell";
import "./GameBoard.css";

interface GameBoardProps {
  board: Board;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onTouchStart,
  onTouchEnd,
}) => {
  return (
    <div
      className="game-board"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="game-board__grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell key={`${rowIndex}-${colIndex}`} value={cell} />
          ))
        )}
      </div>
    </div>
  );
};
