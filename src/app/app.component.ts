import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe';
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

  nextMove(i: number) {
    // CHECK CASELLA VUOTA
    if (this.table[i] == '') {
      // TURNO AGGIUNTO AL CONTATORE
      this.turnCounter++;
      // INSERIMENTO GIOCATORE NELLA CASELLA
      this.table[i] = this.player;
      // PROMPT GIOCATORE SUCCESSIVO
      this.usefulInfo = `È il turno di ${this.player === 'X' ? 'O' : 'X'}`;
      // CHECK RISULTATO
      this.checkResult(this.player);

      this.player = this.player === 'X' ? 'O' : 'X';
    } else {
      // ALERT PER CASELLA OCCUPATA
      this.usefulInfo = "Casella già occupata, scegline un'altra.";
    }
  }

  // METODO DI CONTROLLO RISULTATO
  checkResult(currentPlayer: any) {
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
    let checkCounter: number = 0;

    // CICLO FOREACH PER ANALIZZARE ARRAY RISULTATO
    results.forEach((currentSequence) => {
      // CICLO FOREACH PER CONTROLLO SINGOLA SEQUENZA
      currentSequence.forEach((position) => {
        if (this.table[position] == currentPlayer) {
          checkCounter++;
          // CASISTICA DI VITTORIA
          if (checkCounter > 2) {
            this.usefulInfo = `Vince ${currentPlayer} al turno numero ${this.turnCounter}.`;
            // LOCK DELLA BOARD
            this.tableLocked = true;
            // CASO DI PARITA'
          } else if (this.turnCounter == 9) {
            this.usefulInfo = `Tavola riempita, premere Reset per ricominciare.`;
            this.tableLocked = true;
          }
        }
      });
      // RESET DEL CHECK COUNTER SE LA PARTITA CONTINUA
      checkCounter = 0;
    });
  }
  // METODO RESET DEL GIOCO
  resetGame() {
    this.player = 'X';
    this.tableLocked = false;
    this.turnCounter = 0;
    this.table = ['', '', '', '', '', '', '', '', ''];
    this.usefulInfo = 'Inizia la Partita!';
  }
}
