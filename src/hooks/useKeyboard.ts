import { useEffect, useCallback } from "react";
import type { Direction } from "../types/game";

interface UseKeyboardProps {
    onMove: (direction: Direction) => void;
    onRestart: () => void;
    disabled?: boolean;
}

export const useKeyboard = ({
    onMove,
    onRestart,
    disabled = false,
}: UseKeyboardProps) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (disabled) return;

            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    event.preventDefault();
                    onMove("up");
                    break;
                case "ArrowDown":
                case "KeyS":
                    event.preventDefault();
                    onMove("down");
                    break;
                case "ArrowLeft":
                case "KeyA":
                    event.preventDefault();
                    onMove("left");
                    break;
                case "ArrowRight":
                case "KeyD":
                    event.preventDefault();
                    onMove("right");
                    break;
                case "KeyR":
                    event.preventDefault();
                    onRestart();
                    break;
            }
        },
        [onMove, onRestart, disabled]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};
