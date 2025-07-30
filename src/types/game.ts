export type Cell = number | null;
export type Row = Cell[];
export type Board = Row[];
export type Direction = "up" | "down" | "left" | "right";

export interface GameState {
    board: Board;
    score: number;
    bestScore: number;
    gameOver: boolean;
    won: boolean;
}

export interface Position {
    row: number;
    col: number;
}
