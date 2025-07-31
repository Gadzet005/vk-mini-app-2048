import React from "react";
import "./WelcomeModal.css";

interface WelcomeModalProps {
  isVisible: boolean;
  onStart: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isVisible,
  onStart,
}) => {
  if (!isVisible) return null;

  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal">
        <div className="welcome-modal__content">
          <h2 className="welcome-modal__title">Добро пожаловать в 2048!</h2>
          <div className="welcome-modal__instructions">
            <p className="welcome-modal__text">
              Объединяйте плитки с одинаковыми числами, чтобы достичь 2048
            </p>
            <div className="welcome-modal__controls">
              <h3>Управление:</h3>
              <ul>
                <li>Свайпы (для телефона)</li>
                <li>WASD или стрелки на клавиатуре</li>
                <li>R для перезапуска</li>
              </ul>
            </div>
          </div>
          <button className="welcome-modal__button" onClick={onStart}>
            Начать игру
          </button>
        </div>
      </div>
    </div>
  );
};
