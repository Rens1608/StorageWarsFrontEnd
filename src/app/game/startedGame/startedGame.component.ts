import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Player} from '../../models/player';
import {WsService} from '../../services/wsService';

@Component({
  selector: 'app-started-game',
  templateUrl: './startedGame.component.html',
  styleUrls: ['./startedGame.component.scss']
})
export class StartedGameComponent implements OnInit{
  id!: number;
  player!: Player;
  players: { id: number; name: string }[] = [];
  constructor(private route: ActivatedRoute, private ws: WsService) {
  }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
        }
      );
    this.players = this.ws.getPlayers();
  }
}
