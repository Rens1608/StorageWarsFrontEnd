import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {LobbyComponent} from './game/lobby/lobby.component';
import {StartedGameComponent} from './game/startedGame/startedGame.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  {
    path: 'game',
    children: [
      { path: '', component: GameComponent, pathMatch: 'full'},
      { path: 'started/:id', component: StartedGameComponent},
      { path: 'lobby/:id', component: LobbyComponent },
    ]
  },
  { path: 'login',
    component: LoginComponent,
  },
  { path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
