import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { nextMove, errMove, gameReset } from './game.actions';

export interface GameState {
  // PROMPT A SCHERMO
  usefulInfo: string;
  // TABELLA VUOTA
  table: string[];
  // BLOCCO TABELLA
  tableLocked: boolean;
  // DEFINIZIONE GIOCATORI
  player: string;
  // CONTATORE TURNI
  turnCounter: number;
}

const initalGameState: GameState = {
  usefulInfo: 'Inizia la Partita!',
  table: ['', '', '', '', '', '', '', '', ''],
  tableLocked: false,
  player: 'X',
  turnCounter: 0,
};

const reducer = createReducer(
  initalGameState,
  on(nextMove, (state, action) => {
    // // CHECK CASELLA VUOTA
    if (action.squareValue == '') {
      let newTable = [...state.table];
      let turnCounter = state.turnCounter;
      newTable[action.i] = state.player;
      // MOSSA
      return {
        ...state,
        usefulInfo: `È il turno di ${state.player == 'X' ? 'O' : 'X'}`,
        table: newTable,
        tableLocked: state.turnCounter == 9 ? true : false,
        player: state.player == 'X' ? 'O' : 'X',
        turnCounter: turnCounter++,
      };
    } else {
      // RITORNO SE CASELLA VUOTA
      return {
        ...state,
        usefulInfo: 'Casella già occupata.',
      };
    }
  }),
  on(errMove, (state, action) => ({
    ...state,
    usefulInfo: action.value,
  })),
  on(gameReset, () => ({
    ...initalGameState,
  }))
);

export function gameReducer(state: GameState, action: Action) {
  return reducer(state, action);
}

export const gameSelector = createFeatureSelector<GameState>('game');
