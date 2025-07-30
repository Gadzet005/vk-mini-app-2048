import type { Board, Direction, Row } from "../types/game";
import { cloneBoard } from "./board";
import { BOARD_SIZE } from "./consts";

interface MoveResult {
    board: Board;
    score: number;
    moved: boolean;
}

function isRowsEqual(row1: Row, row2: Row): boolean {
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] !== row2[i]) return false;
    }
    return true;
}

function processRow(row: Row): {
    row: Row;
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
    const result: Row = [...merged];
    while (result.length < BOARD_SIZE) {
        result.push(null);
    }

    return { row: result, score };
}

function rotateBoard(board: Board) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = i + 1; j < BOARD_SIZE; j++) {
            const temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i].reverse();
    }
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
    rotateBoard(board);
    rotateBoard(board);

    const result = moveLeft(board);

    rotateBoard(result.board);
    rotateBoard(result.board);

    return result;
}

function moveUp(board: Board): MoveResult {
    rotateBoard(board);
    rotateBoard(board);
    rotateBoard(board);

    const result = moveLeft(board);

    rotateBoard(result.board);

    return result;
}

function moveDown(board: Board): MoveResult {
    rotateBoard(board);
    const result = moveLeft(board);

    rotateBoard(result.board);
    rotateBoard(result.board);
    rotateBoard(result.board);

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
