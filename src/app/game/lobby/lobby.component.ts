import {Player} from '../../models/player';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WsService} from '../../services/wsService';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit, OnDestroy {
  player: Player | undefined;
  players: { id: number; name: string; }[] = [];
  displayedColumns: string[] | undefined;
  id!: number;

  constructor(private route: ActivatedRoute, private router: Router, public ws: WsService) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          console.log(this.id);
        }
      );
    this.players = this.ws.getPlayers();
    this.ws.connect(this.id);
    this.displayedColumns = ['name', 'actions'];
    setTimeout(() => {
         const retrievedItem = sessionStorage.getItem('currentPlayer');
         if (retrievedItem != null ) {
           this.player = JSON.parse(retrievedItem);
           const player = this.player;
           this.ws.joinGame(player, this.id);
          }
       }, 1000
     );
  }

  leaveGame(): void {
    console.log('Leaving game');
    this.ws.leaveGame(this.player, this.id);
    this.router.navigate(['/game']);
  }

  startGame(): void{
    this.ws.startGame(this.id);
  }

  ngOnDestroy(): void {
    this.ws.leaveGame(this.player, this.id);
  }
}

