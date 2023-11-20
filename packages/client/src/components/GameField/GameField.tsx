import React, { useEffect, useState, useRef, FC } from 'react';
import { Box, Typography } from '@mui/material';
import Game from './Game/Game';
import type { Statistics } from './Game/types';
import './gameFieldStyles.scss';
import { EndGameFailDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameFailDialog';
import { EndGameDialog } from '../../pages/GamePages/SettingsPage/EndGameForm/EndGameDialog';

export const GameField: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [result, setResult] = useState<Statistics | null>(null);

  const onEndGame = (gameResult: Statistics) => {
    // TODO: временная заглушка с результатами игры
    if (gameResult.isWin) {
      console.table([result]);
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
      setGame(new Game(canvasRef.current, ctx, onEndGame));
    }
  }, []);

  return (
    <Box className='game-field'>
      {result ? (
        // TODO Доработка передачи параметров в диалоговое окно
        result.isWin ? (
          <EndGameDialog place='10 место' time='10 мин.' />
        ) : (
          <EndGameFailDialog />
        )
      ) : (
        <canvas ref={canvasRef} />
      )}
    </Box>
  );
};
