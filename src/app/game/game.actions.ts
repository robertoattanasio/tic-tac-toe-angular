import { createAction, props } from '@ngrx/store';

export const nextMove = createAction('GAME/nextMove', props<{ i: number }>());
export const errMove = createAction('GAME/errMove', props<{ value: string }>());
export const gameReset = createAction('GAME/resetTable');
