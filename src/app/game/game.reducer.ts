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

// DEFAULT STATE DEL GIOCO
const initalGameState: GameState = {
  usefulInfo: 'Inizia la Partita!',
  table: ['', '', '', '', '', '', '', '', ''],
  tableLocked: false,
  player: 'X',
  turnCounter: 0,
};

const reducer = createReducer(
  initalGameState,
  // MOSSA SUCCESSIVA
  on(nextMove, (state, action) => {
    // COPIA DELLA TABELLA IN VARIABILE E AGGIUNTA DELLA MOSSA NUOVA
    let tableToCheck = [...state.table];
    tableToCheck[action.i] = state.player;

    // CHECK DI VITTORIA
    if (checkResult(tableToCheck, state.player)) {
      // RITORNO SE UN GIOCATORE VINCE
      return {
        ...state,
        table: tableToCheck,
        usefulInfo: `Partita finita. Vince ${state.player}.`,
        tableLocked: true,
      };
    } else {
      if (state.turnCounter == 8) {
        // RITORNO SE LA PARTITA FINISCE IN PAREGGIO
        return {
          ...state,
          table: tableToCheck,
          usefulInfo: `Partita finita in pareggio.`,
          tableLocked: true,
        };
      } else {
        // RITORNO SE LA PARTITA CONTINUA
        return {
          ...state,
          table: tableToCheck,
          usefulInfo: `È il turno di ${state.player == 'X' ? 'O' : 'X'}`,
          player: state.player == 'X' ? 'O' : 'X',
          turnCounter: state.turnCounter + 1,
        };
      }
    }
  }),
  // MOSSA ERRATA
  on(errMove, (state, action) => ({
    ...state,
    usefulInfo: action.value,
    player: state.player,
  })),
  // RESET GIOCO
  on(gameReset, () => ({
    ...initalGameState,
  }))
);

// EXPORT DEL GAME REDUCER
export function gameReducer(state: GameState, action: Action) {
  return reducer(state, action);
}

// EXPORT DEL GAME SELECTOR
export const gameSelector = createFeatureSelector<GameState>('game');

// FUNZIONE DI CHECK DEL RISULTATO
function checkResult(tableToCheck: string[], player: string): any {
  // SEQUENZE CORRETTE
  let results = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // CICLO DENTRO L'ARRAY DEI RISULTATI PER CONTROLLARE SE ESISTE UNA COMBINAZIONE VALIDA
  let checkResult: boolean;
  for (let c = 0; c < results.length; c++) {
    // CONTATORE PER I CHECK CON RISULTATI
    let checkCounter = 0;
    results[c].forEach((position) => {
      if (tableToCheck[position] === player) {
        checkCounter = checkCounter + 1;
        if (checkCounter > 2) {
          checkResult = true;
        }
      }
    });
  }
  return checkResult;
}
