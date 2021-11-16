import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tic-tac-toe', component: GameComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    InfoComponent,
    HeaderComponent,
    HomeComponent,
    GameComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
