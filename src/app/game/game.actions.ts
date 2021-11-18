import { createAction, props } from '@ngrx/store';
import { GameState } from './game.reducer';

export const nextMove = createAction(
  'GAME/nextMove',
  props<{ squareValue: string; i: number }>()
);
export const errMove = createAction(
  'GAME/sameMove',
  props<{ value: string }>()
);
export const gameReset = createAction('GAME/resetTable');
