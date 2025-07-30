import type { Board, Direction } from "../types/game";
import { cloneBoard } from "./board";
import { BOARD_SIZE } from "./consts";

interface MoveResult {
    board: Board;
    score: number;
    moved: boolean;
}

function isRowsEqual(
    row1: (number | null)[],
    row2: (number | null)[]
): boolean {
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] !== row2[i]) return false;
    }
    return true;
}

function processRow(row: (number | null)[]): {
    row: (number | null)[];
    score: number;
} {
    const filtered = row.filter((cell) => cell !== null);
    let score = 0;

    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            score += filtered[i];
            filtered[i + 1] = 0;
            i++;
        }
    }

    const merged = filtered.filter((cell) => cell !== 0);
    const result: (number | null)[] = [...merged];
    while (result.length < BOARD_SIZE) {
        result.push(null);
    }

    return { row: result, score };
}

function rotateBoard(board: Board): Board {
    const rotated: Board = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null));

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            rotated[col][BOARD_SIZE - row - 1] = board[row][col];
        }
    }

    return rotated;
}

function moveLeft(board: Board): MoveResult {
    const newBoard = cloneBoard(board);
    let totalScore = 0;
    let moved = false;

    for (let row = 0; row < BOARD_SIZE; row++) {
        const originalRow = [...newBoard[row]];
        const { row: processedRow, score } = processRow(newBoard[row]);

        newBoard[row] = processedRow;
        totalScore += score;

        if (!isRowsEqual(originalRow, processedRow)) {
            moved = true;
        }
    }

    return { board: newBoard, score: totalScore, moved };
}

function moveRight(board: Board): MoveResult {
    let rotated = rotateBoard(board);
    rotated = rotateBoard(rotated);

    const result = moveLeft(rotated);

    result.board = rotateBoard(result.board);
    result.board = rotateBoard(result.board);

    return result;
}

function moveUp(board: Board): MoveResult {
    let rotated = rotateBoard(board);
    rotated = rotateBoard(rotated);
    rotated = rotateBoard(rotated);

    const result = moveLeft(rotated);

    result.board = rotateBoard(result.board);

    return result;
}

function moveDown(board: Board): MoveResult {
    const rotated = rotateBoard(board);
    const result = moveLeft(rotated);

    result.board = rotateBoard(result.board);
    result.board = rotateBoard(result.board);
    result.board = rotateBoard(result.board);

    return result;
}

export function move(board: Board, direction: Direction): MoveResult {
    switch (direction) {
        case "left":
            return moveLeft(board);
        case "right":
            return moveRight(board);
        case "up":
            return moveUp(board);
        case "down":
            return moveDown(board);
        default:
            return { board: cloneBoard(board), score: 0, moved: false };
    }
}
