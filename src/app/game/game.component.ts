import { Component, OnInit } from '@angular/core';
// NGRX
import { Store } from '@ngrx/store';
import { nextMove, errMove, gameReset } from './game.actions';
import { gameSelector, GameState } from './game.reducer';
// RXJS
import { map } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [],
})
export class GameComponent implements OnInit {
  constructor(private store: Store) {}

  game$ = this.store.select(gameSelector);

  usefulInfo$ = this.game$.pipe(map((x) => x.usefulInfo));
  table$ = this.game$.pipe(map((x) => x.table));
  tableLocked$ = this.game$.pipe(map((x) => x.tableLocked));
  player$ = this.game$.pipe(map((x) => x.player));

  ngOnInit() {}

  nextMove(squareValue: string, i: number) {
    this.store.dispatch(nextMove({ squareValue: squareValue, i: i }));

    // // CHECK CASELLA VUOTA
    // if (this.table$[i] == '') {
    //   // // TURNO AGGIUNTO AL CONTATORE
    //   // this.gamedata.turnCounter++;
    //   // // INSERIMENTO GIOCATORE NELLA CASELLA
    //   // this.gamedata.table[i] = this.gamedata.player;
    //   // // PROMPT GIOCATORE SUCCESSIVO
    //   // this.gamedata.usefulInfo = `È il turno di ${
    //   //   this.gamedata.player === 'X' ? 'O' : 'X'
    //   // }`;
    //   // // CHECK RISULTATO
    //   // this.checkResult(this.gamedata.player);
    //   // this.gamedata.player = this.gamedata.player === 'X' ? 'O' : 'X';
    // } else {
    //   // ALERT PER CASELLA OCCUPATA
    //   this.gamedata.usefulInfo = "Casella già occupata, scegline un'altra.";
    // }
  }

  // // METODO DI CONTROLLO RISULTATO
  // checkResult(currentPlayer: any) {
  //   // SEQUENZE CORRETTE
  //   let results = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  //   let checkCounter: number = 0;

  //   // CICLO FOREACH PER ANALIZZARE ARRAY RISULTATO
  //   results.forEach((currentSequence) => {
  //     // CICLO FOREACH PER CONTROLLO SINGOLA SEQUENZA
  //     currentSequence.forEach((position) => {
  //       if (this.gamedata.table[position] == currentPlayer) {
  //         checkCounter++;
  //         // CASISTICA DI VITTORIA
  //         if (checkCounter > 2) {
  //           this.gamedata.usefulInfo = `Vince ${currentPlayer} al turno numero ${this.gamedata.turnCounter}.`;
  //           // LOCK DELLA BOARD
  //           this.gamedata.tableLocked = true;
  //           // CASO DI PARITA'
  //         } else if (this.gamedata.turnCounter == 9) {
  //           this.gamedata.usefulInfo = `Tavola riempita, premere Reset per ricominciare.`;
  //           this.gamedata.tableLocked = true;
  //         }
  //       }
  //     });
  //     // RESET DEL CHECK COUNTER SE LA PARTITA CONTINUA
  //     checkCounter = 0;
  //   });
  // }

  // METODO RESET DEL GIOCO
  resetGame() {
    this.store.dispatch(gameReset());
  }
}
