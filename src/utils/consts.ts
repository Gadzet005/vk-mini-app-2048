export const BOARD_SIZE = 4;
export const WINNING_TILE = 2048;

export function randomCellValue(): number {
    return Math.random() < 0.9 ? 2 : 4;
}
