import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// NGRX
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './game/game.reducer';
// MAIN APP
import { AppComponent } from './app.component';
// HEADER
import { HeaderComponent } from './header/header.component';
// HOME
import { HomeComponent } from './home/home.component';
// GAME
import { GameComponent } from './game/game.component';
import { SquareComponent } from './game/square/square.component';
import { InfoComponent } from './game/info/info.component';
import { GameService } from './game.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tic-tac-toe', component: GameComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GameComponent,
    SquareComponent,
    InfoComponent,
  ],
  imports: [
    StoreModule.forRoot({
      game: gameReducer,
    }),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
