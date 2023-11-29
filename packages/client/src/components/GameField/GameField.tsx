import React, { useEffect, useState, useRef, FC } from 'react';
import { Box } from '@mui/material';
import Game from './Game/Game';
import { SettingGame } from '../../pages/GamePages/SettingsPage/SettingsProvider';
import { EndGameFailDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameFailDialog';
import { EndGameDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameDialog';
import { GAME_TYPES } from './Game/consts';
import type { Statistics } from './Game/types';
import './gameFieldStyles.scss';

export const GameField: FC = () => {
  const {
    state: { colorsCount, stepsCount, type },
  } = SettingGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [result, setResult] = useState<Statistics | null>(null);

  const onEndGame = (gameResult: Statistics) => {
    // TODO: временная заглушка с результатами игры
    if (gameResult.isWin) {
      console.table([gameResult]);
    }

    setResult(gameResult);
  };

  useEffect(() => {
    if (game) {
      return () => game.destructor();
    }

    const ctx = canvasRef.current?.getContext('2d');

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
          onEndGame,
          Number.parseInt(colorsCount || '', 10),
          Number.parseInt(stepsCount || '', 10),
          type === GAME_TYPES.withColorsRepeated
        )
      );
    }
  }, []);

  return (
    <Box className='game-field'>
      {result &&
        (result.isWin ? (
          // TODO Доработка передачи параметров в диалоговое окно
          <EndGameDialog place='10 место' time={result.time} />
        ) : (
          <EndGameFailDialog />
        ))}
      <canvas ref={canvasRef} className={`${result ? 'field_hidden' : 'field_visible'}`} />
    </Box>
  );
};
