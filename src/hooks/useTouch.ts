import { useRef, useCallback } from "react";
import type { Direction } from "../types/game";

interface TouchHandlers {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
}

interface UseTouchProps {
    onMove: (direction: Direction) => void;
    disabled?: boolean;
}

export const useTouch = ({
    onMove,
    disabled = false,
}: UseTouchProps): TouchHandlers => {
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const onTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (disabled) return;

            const firstTouch = e.touches[0];
            const start = {
                x: firstTouch.clientX,
                y: firstTouch.clientY,
            };

            touchStartRef.current = start;
        },
        [disabled]
    );

    const onTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            if (disabled || !touchStartRef.current) return;

            const firstTouch = e.changedTouches[0];
            const end = {
                x: firstTouch.clientX,
                y: firstTouch.clientY,
            };

            const deltaX = end.x - touchStartRef.current.x;
            const deltaY = end.y - touchStartRef.current.y;
            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        onMove("right");
                    } else {
                        onMove("left");
                    }
                }
            } else if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    onMove("down");
                } else {
                    onMove("up");
                }
            }

            touchStartRef.current = null;
        },
        [disabled, onMove]
    );

    return {
        onTouchStart,
        onTouchEnd,
    };
};
