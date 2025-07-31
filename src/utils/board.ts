import type { Board, Position } from "../types/game";
import { BOARD_SIZE, randomCellValue, WINNING_TILE } from "../consts/game";

export function createEmptyBoard(): Board {
    return Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null));
}

export function getEmptyCells(board: Board): Position[] {
    const emptyCells: Position[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === null) {
                emptyCells.push({ row, col });
            }
        }
    }

    return emptyCells;
}

export function addRandomCell(board: Board): Board {
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0) {
        return board;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    const value = randomCellValue();

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = value;

    return newBoard;
}

export function initializeBoard(): Board {
    let board = createEmptyBoard();
    board = addRandomCell(board);
    board = addRandomCell(board);
    return board;
}

export function canMove(board: Board): boolean {
    if (getEmptyCells(board).length > 0) {
        return true;
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const current = board[row][col];

            if (
                (col < BOARD_SIZE - 1 && board[row][col + 1] === current) ||
                (row < BOARD_SIZE - 1 && board[row + 1][col] === current)
            ) {
                return true;
            }
        }
    }

    return false;
}

export function hasWon(board: Board): boolean {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === WINNING_TILE) {
                return true;
            }
        }
    }
    return false;
}

export function cloneBoard(board: Board): Board {
    return board.map((row) => [...row]);
}
