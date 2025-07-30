import { useState, useCallback, useEffect } from "react";
import type { GameState, Direction } from "../types/game";
import {
    initializeBoard,
    addRandomCell,
    canMove,
    hasWon,
} from "../utils/board";
import { move } from "../utils/gameLogic";
import { saveToStorage, loadFromStorage } from "../utils/storage";

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(() => {
        const saved = loadFromStorage();
        return {
            board: initializeBoard(),
            score: 0,
            bestScore: saved.bestScore,
            gameOver: false,
            won: false,
        };
    });

    const [justWon, setJustWon] = useState(false);

    useEffect(() => {
        if (gameState.score > gameState.bestScore) {
            const newBestScore = gameState.score;
            setGameState((prev) => ({ ...prev, bestScore: newBestScore }));
            saveToStorage({ bestScore: newBestScore });
        }
    }, [gameState.score, gameState.bestScore]);

    const makeMove = useCallback(
        (direction: Direction) => {
            if (gameState.gameOver) return;

            const result = move(gameState.board, direction);

            if (!result.moved) return;

            const newBoard = addRandomCell(result.board);
            const newScore = gameState.score + result.score;
            const won = hasWon(newBoard);
            const gameOver = !canMove(newBoard);

            if (won && !gameState.won) {
                setJustWon(true);
            }

            setGameState((prev) => ({
                ...prev,
                board: newBoard,
                score: newScore,
                gameOver,
                won: won || prev.won,
            }));
        },
        [gameState]
    );

    const restart = useCallback(() => {
        setGameState((prev) => ({
            board: initializeBoard(),
            score: 0,
            bestScore: prev.bestScore,
            gameOver: false,
            won: false,
        }));
        setJustWon(false);
    }, []);

    const continueGame = useCallback(() => {
        setJustWon(false);
    }, []);

    return {
        gameState,
        makeMove,
        restart,
        justWon,
        continueGame,
    };
};
