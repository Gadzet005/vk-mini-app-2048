import React from "react";
import "./GameOverModal.css";

interface GameOverModalProps {
  isVisible: boolean;
  won: boolean;
  score: number;
  onRestart: () => void;
  onContinue?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  won,
  score,
  onRestart,
  onContinue,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div
          className={`modal__content ${
            won ? "modal__content--won" : "modal__content--lost"
          }`}
        >
          <h2 className="modal__title">
            {won ? "🎉 Поздравляем!" : "😔 Игра окончена"}
          </h2>
          <p className="modal__message">
            {won ? "Вы достигли цели 2048!" : "Больше нет доступных ходов"}
          </p>
          <p className="modal__score">
            Ваш счёт: <strong>{score.toLocaleString("ru-RU")}</strong>
          </p>
          <div className="modal__buttons">
            <button
              className="modal__button modal__button--primary"
              onClick={onRestart}
            >
              Начать заново
            </button>
            {won && onContinue && (
              <button
                className="modal__button modal__button--secondary"
                onClick={onContinue}
              >
                Продолжить игру
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
