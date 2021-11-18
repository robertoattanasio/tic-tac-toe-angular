import { Component, OnInit } from '@angular/core';
// NGRX
import { Store } from '@ngrx/store';
import { nextMove, errMove, gameReset } from './game.actions';
import { gameSelector, GameState } from './game.reducer';
// RXJS
import { map } from 'rxjs';

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
    if (squareValue == '') {
      this.store.dispatch(nextMove({ i: i }));
    } else {
      this.store.dispatch(errMove({ value: 'Casella già occupata.' }));
    }
  }

  // METODO RESET DEL GIOCO
  resetGame() {
    this.store.dispatch(gameReset());
  }
}
