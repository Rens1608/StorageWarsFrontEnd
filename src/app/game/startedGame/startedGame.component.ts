import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Player} from '../../models/player';
import {WsService} from '../../services/wsService';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-started-game',
  templateUrl: './startedGame.component.html',
  styleUrls: ['./startedGame.component.scss']
})
export class StartedGameComponent implements OnInit{
  id!: number;
  player!: Player;
  players: { id: number; name: string }[] = [];
  form!: FormGroup;
  constructor(private route: ActivatedRoute, private ws: WsService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
        }
      );
    const retrievedItem = sessionStorage.getItem('currentPlayer');
    if (retrievedItem != null) {
      console.log(retrievedItem);
      this.player = JSON.parse(retrievedItem);
      this.players = this.ws.getPlayers();
      this.ws.setupGame(this.id);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.ws.placeBid(this.form.get('bid')?.value);
  }
}
