import React, { useEffect, useState, useRef, FC } from 'react';
import { Box, Typography } from '@mui/material';
import Game from './Game/Game';
import type { Statistics } from './Game/types';
import './gameFieldStyles.scss';

const GameField: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [result, setResult] = useState<Statistics | null>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (game) {
      return () => game.destructor();
    }

    const ctx = canvasRef.current?.getContext('2d');

    if (!canvasRef.current || !ctx) {
      console.warn('Не найден элемент canvas или его контекст');

      // eslint-disable-next-line consistent-return
      return;
    }

    setGame(new Game(canvasRef.current, ctx, setResult));
  }, []);

  // TODO: временная заглушка с результатами игры
  if (result && result.isWin) {
    console.table([result]);
  }

  return (
    <Box className='game-field'>
      {result ? (
        <Typography>{result.isWin ? 'Выиграл' : 'Проиграл'}</Typography>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </Box>
  );
};

export default GameField;
