import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/gameService';
import {Game} from '../models/Game';
import {Player} from '../models/player';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  player: Player | undefined;
  gameList: Game[] | undefined;
  playerCount: number | undefined;

  constructor(private gameService: GameService, private router: Router) {
    this.game = new Game();
    this.game.players = [];
  }

  ngOnInit(): void {
    const retrievedItem = sessionStorage.getItem('currentPlayer');
    if(retrievedItem != null){
      this.refreshGameList();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  createGame(): void {
    this.gameService.create(this.game).subscribe(() => this.refreshGameList());
  }
  refreshGameList(): void{
    this.setPlayerCount(this.game);
    this.gameService.getAll().subscribe(data => {this.gameList = data; });
  }

  joinGame(id: number | undefined): void {
    console.log(id);
    this.router.navigate(['game/lobby/' + id]);
  }

  setPlayerCount(game: Game): void {
    if (this.game.players === undefined){
      this.playerCount = 0;
    }else{
      this.playerCount = game.players?.length;
    }
  }
}
