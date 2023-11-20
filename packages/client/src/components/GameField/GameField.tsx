import React, { useEffect, useState, useRef, FC } from 'react';
import { Box, Typography } from '@mui/material';
import Game from './Game/Game';
import type { Statistics } from './Game/types';
import './gameFieldStyles.scss';

const GameField: FC = () => {
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
      setGame(new Game(canvasRef.current, ctx, onEndGame));
    }
  }, []);

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
