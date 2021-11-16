import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [],
})
export class GameComponent implements OnInit {
  constructor(public gamedata: GameService) {}

  ngOnInit() {}

  nextMove(i: number) {
    // CHECK CASELLA VUOTA
    if (this.gamedata.table[i] == '') {
      // TURNO AGGIUNTO AL CONTATORE
      this.gamedata.turnCounter++;
      // INSERIMENTO GIOCATORE NELLA CASELLA
      this.gamedata.table[i] = this.gamedata.player;
      // PROMPT GIOCATORE SUCCESSIVO
      this.gamedata.usefulInfo = `È il turno di ${
        this.gamedata.player === 'X' ? 'O' : 'X'
      }`;
      // CHECK RISULTATO
      this.checkResult(this.gamedata.player);

      this.gamedata.player = this.gamedata.player === 'X' ? 'O' : 'X';
    } else {
      // ALERT PER CASELLA OCCUPATA
      this.gamedata.usefulInfo = "Casella già occupata, scegline un'altra.";
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
        if (this.gamedata.table[position] == currentPlayer) {
          checkCounter++;
          // CASISTICA DI VITTORIA
          if (checkCounter > 2) {
            this.gamedata.usefulInfo = `Vince ${currentPlayer} al turno numero ${this.gamedata.turnCounter}.`;
            // LOCK DELLA BOARD
            this.gamedata.tableLocked = true;
            // CASO DI PARITA'
          } else if (this.gamedata.turnCounter == 9) {
            this.gamedata.usefulInfo = `Tavola riempita, premere Reset per ricominciare.`;
            this.gamedata.tableLocked = true;
          }
        }
      });
      // RESET DEL CHECK COUNTER SE LA PARTITA CONTINUA
      checkCounter = 0;
    });
  }
  // METODO RESET DEL GIOCO
  resetGame() {
    this.gamedata.player = 'X';
    this.gamedata.tableLocked = false;
    this.gamedata.turnCounter = 0;
    this.gamedata.table = ['', '', '', '', '', '', '', '', ''];
    this.gamedata.usefulInfo = 'Inizia la Partita!';
  }
}
