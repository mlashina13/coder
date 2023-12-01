import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Game from './Game/Game';
import './gameFieldStyles.scss';
import { EndGameFailDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameFailDialog';
import { EndGameDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameDialog';
import { SettingGame } from '../../pages/GamePages/SettingsPage/SettingsProvider';
import type { Statistics } from './Game/types';
import { ROUTER_URLS } from '../../constants/routes';
import { Button } from '../common/Button/Button';

export const GameField: FC = () => {
  // Параметры для настройки игры
  const { settings, endGame } = SettingGame();

  // Для отображение времени на экране
  const time = settings.time || 1;
  const [seconds, setSeconds] = useState<number>(Number(time) * 60);

  // Запуск таймера
  const [isTimerRunner, setIsTimerRunner] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [result, setResult] = useState<Statistics | null>(null);

  // Открытиые диалогового окна выйграл/проиграл
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Навигация по системе
  const navigate = useNavigate();

  const onEndGame = (gameResult: Statistics) => {
    // TODO: временная заглушка с результатами игры
    if (gameResult.isWin) {
      console.table([result]);
    }
    setResult(gameResult);
    setIsTimerRunner(false);
    setOpenDialog(true);
  };

  useEffect(() => {
    if (game) {
      game.destructor();
    }

    const ctx = canvasRef.current?.getContext('2d');

    if (!canvasRef.current || !ctx) {
      console.warn('Не найден элемент canvas или его контекст');
    } else {
      setGame(
        new Game(
          canvasRef.current,
          ctx,
          onEndGame,
          Number(settings.colorsCount),
          Number(settings.stepsCount),
          Boolean(settings.isColorsMayBeRepeated)
        )
      );
    }
  }, [settings, isTimerRunner]);

  const minuteString = String(Math.floor(Number(seconds) / 60)).padStart(2, '0');
  const secondString = String(Number(seconds) % 60).padStart(2, '0');
  const isDanger = seconds < 10;

  useEffect(() => {
    if (isTimerRunner) {
      /** Запускаем таймер */
      const interval = setInterval(() => {
        // @ts-ignore
        setSeconds((second) => {
          if (second) {
            return Math.max(Number(second) - 1, 0);
          }
          onEndGame({ isWin: false });
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isTimerRunner]);

  /** Функция, перезапуска игры */
  const handleRestartGame = () => {
    setOpenDialog(false);
    setResult(null);
    endGame(settings);
  };

  /** Навигация на главную страницу */
  const handleGoToMain = () => {
    navigate(ROUTER_URLS.Main);
  };

  /** Навигация на страницу Интересной информации */
  const handleGoToInfo = () => {
    navigate(ROUTER_URLS.Informations);
  };

  const handleFullScreen = () => {
    // TODO реализация игры на весь экран
  };

  return (
    <Box className='game-field'>
      {result ? (
        result.isWin ? (
          <EndGameDialog
            statistic={result}
            onStartNewGame={handleRestartGame}
            onGoToMainPage={handleGoToMain}
            onGoToInfoPage={handleGoToInfo}
            openDialog={openDialog}
          />
        ) : (
          <EndGameFailDialog
            onRestart={handleRestartGame}
            onStartNewGame={handleRestartGame}
            onGoToMainPage={handleGoToMain}
            onGoToInfoPage={handleGoToInfo}
            openDialog={openDialog}
          />
        )
      ) : (
        <Box>
          <Container className='game-page__buttons-block'>
            <span className={isDanger ? 'text-danger' : 'text-slate'}>
              Время: {minuteString}:{secondString}
            </span>
            <Button onClick={handleFullScreen} label='На полный экран' />
          </Container>
          <canvas ref={canvasRef} />
        </Box>
      )}
    </Box>
  );
};
