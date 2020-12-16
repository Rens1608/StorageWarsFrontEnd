import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent } from './register/register.component';
import {PlayerService} from './services/playerService';
import { HttpClientModule } from '@angular/common/http';
import {GameService} from './services/gameService';
import {LobbyComponent} from './game/lobby/lobby.component';
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule, MatListModule, MatFormFieldModule
} from '@angular/material';
import {WsService} from './services/wsService';
import {StartedGameComponent} from './game/startedGame/startedGame.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    LobbyComponent,
    StartedGameComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  providers: [
    PlayerService,
    GameService,
    WsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
