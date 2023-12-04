import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Game from './Game/Game';
import './gameFieldStyles.scss';
import { EndGameFailDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameFailDialog';
import { EndGameDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameDialog';
import { useSettingGame } from '../../pages/GamePages/SettingsPage/SettingsProvider';
import type { Statistics } from './Game/types';
import { ROUTER_URLS } from '../../constants/routes';
import { Button } from '../common/Button/Button';

export const GameField: FC = () => {
  // Параметры для настройки игры
  const { settings, endGame } = useSettingGame();

  // Для отображение времени на экране
  const time = settings.time || 1;
  const [seconds, setSeconds] = useState<number>(time * 60);

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
      return () => game.destructor();
    }

    const ctx = canvasRef.current?.getContext('2d');

    console.log(window.innerHeight - 48 - 40 - 4 - 40 - 24 - 24);

    if (!canvasRef.current || !ctx) {
      console.warn('Не найден элемент canvas или его контекст');
    } else {
      /*
       * При монтировании компонента сразу создается инстанс игры. После этого из других компонентов
       * можно вызывать новую игру с помощью Game.start() или перезапускать текущую игру с помощью
       * Game.restart(). В метод start можно передать новые настройки. Без них игра перезапустится
       * с теми же настройками, что и предыдущая.
       */
      setGame(
        new Game(
          canvasRef.current,
          ctx,
          /*
           * Здесь происходит расчет высоты, которую может занять игровое поле на экране.
           * По очереди учитывается высота .page-header, .navigation-panel, .layout__divider, .main-menu
           * и паддинги внутри .layout__content.
           * Пока не нашла способа сделать это изящнее, поэтому если высота указанных выше элементов
           * будет меняться, дополнительно придется исправлять ее здесь.
           */
          window.innerHeight - 48 - 40 - 4 - 40 - 24 - 24,
          onEndGame,
          settings.colorsCount,
          settings.stepsCount,
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
            return second - 1;
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

  const contentRenderer = () => {
    if (!result) {
      return (
        <Box className='game-page'>
          <Box className='game-page__block'>
            <span
              className={
                isDanger ? 'game-page__block__timer-danger' : 'game-page__block__timer-slate'
              }
            >
              Время: {minuteString}:{secondString}
            </span>
            <Button
              onClick={handleFullScreen}
              label='На полный экран'
              className='game-page__block__button'
            />
          </Box>
          <canvas ref={canvasRef} />
        </Box>
      );
    }

    if (result.isWin) {
      return (
        <EndGameDialog
          statistic={result}
          onStartNewGame={handleRestartGame}
          onGoToMainPage={handleGoToMain}
          onGoToInfoPage={handleGoToInfo}
          openDialog={openDialog}
        />
      );
    }
    return (
      <EndGameFailDialog
        onRestart={handleRestartGame}
        onStartNewGame={handleRestartGame}
        onGoToMainPage={handleGoToMain}
        onGoToInfoPage={handleGoToInfo}
        openDialog={openDialog}
      />
    );
  };

  return <Box className='game-field'>{contentRenderer()}</Box>;
};
