import React, { useEffect, useState } from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { useGameState } from "../hooks/useGameState";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTouch } from "../hooks/useTouch";
import { GameBoard } from "./GameBoard";
import { ScoreBoard } from "./ScoreBoard";
import { GameControls } from "./GameControls";
import { GameOverModal } from "./GameOverModal";
import { WelcomeModal } from "./WelcomeModal";
import "./Game.css";
import { VKBridgeEvents } from "../consts/vk";

export const Game: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { gameState, makeMove, restart, justWon, continueGame } =
    useGameState();
  const disabled = gameState.gameOver || justWon || showWelcome;

  const handleStartGame = () => {
    setShowWelcome(false);
  };

  useKeyboard({
    onMove: makeMove,
    onRestart: restart,
    disabled,
  });

  const touchHandlers = useTouch({
    onMove: makeMove,
    disabled,
  });

  useEffect(() => {
    vkBridge.send(VKBridgeEvents.Init).catch((error) => {
      console.error("Ошибка инициализации VK Bridge:", error);
    });
  }, []);

  return (
    <div className="game">
      <header className="game__header">
        <ScoreBoard score={gameState.score} bestScore={gameState.bestScore} />
      </header>

      <main className="game__main">
        <GameBoard
          board={gameState.board}
          onTouchStart={touchHandlers.onTouchStart}
          onTouchEnd={touchHandlers.onTouchEnd}
        />

        <GameControls onRestart={restart} />
      </main>

      <GameOverModal
        isVisible={gameState.gameOver || justWon}
        won={justWon}
        score={gameState.score}
        onRestart={restart}
        onContinue={justWon ? continueGame : undefined}
      />

      <WelcomeModal isVisible={showWelcome} onStart={handleStartGame} />
    </div>
  );
};
