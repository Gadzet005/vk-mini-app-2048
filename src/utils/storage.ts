const STORAGE_KEY = "game2048";

export interface StorageData {
    bestScore: number;
}

export const saveToStorage = (data: StorageData) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn("Не удалось сохранить данные в localStorage:", error);
    }
};

export const loadFromStorage = (): StorageData => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.warn("Не удалось загрузить данные из localStorage:", error);
    }

    return { bestScore: 0 };
};
