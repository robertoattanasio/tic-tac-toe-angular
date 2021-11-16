export class GameService {
  // PROMPT A SCHERMO
  usefulInfo = 'Inizia la Partita!';
  // TABELLA VUOTA
  table = ['', '', '', '', '', '', '', '', ''];
  // BLOCCO TABELLA
  tableLocked: boolean = false;
  // DEFINIZIONE GIOCATORI
  player: 'X' | 'O' = 'X';
  // CONTATORE TURNI
  turnCounter = 0;
}
