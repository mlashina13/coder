import React, { useEffect, useState, useRef, FC } from 'react';
import { Box } from '@mui/material';
import Game from './Game/Game';
import { SettingGame } from '../../pages/GamePages/SettingsPage/SettingsProvider';
import { EndGameFailDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameFailDialog';
import { EndGameDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameDialog';
import type { Statistics } from './Game/types';
import './gameFieldStyles.scss';
import { GAME_TYPES } from './Game/consts';

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
      {result ? (
        // TODO Доработка передачи параметров в диалоговое окно
        result.isWin ? (
          <EndGameDialog place='10 место' time={result.time} />
        ) : (
          <EndGameFailDialog />
        )
      ) : (
        <canvas ref={canvasRef} />
      )}
    </Box>
  );
};
