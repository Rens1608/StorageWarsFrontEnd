import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Player} from '../../models/player';
import {WsService} from '../../services/wsService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Bid} from '../../models/Bid';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

@Component({
  selector: 'app-started-game',
  templateUrl: './startedGame.component.html',
  styleUrls: ['./startedGame.component.scss']
})
export class StartedGameComponent implements OnInit{
  bid: Bid;
  id!: number;
  player!: Player;
  players: { id: number; name: string }[] = [];
  form!: FormGroup;
  constructor(private snackbar: MatSnackBar, private route: ActivatedRoute,
              private ws: WsService, private router: Router, private fb: FormBuilder) {
    this.bid = new Bid();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      bid: ['', Validators.required]
    })
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

  placeBid(): void {
    this.bid.amount = this.form.get('bid')?.value;
    console.log(sessionStorage.getItem('currentPlayer'));
    this.bid.player = this.player;
    console.log(this.ws.getHighestBid());
    setTimeout(() => {
      if (this.bid.amount > this.ws.getHighestBid() || this.ws.getHighestBid() === undefined) {
        this.player.balance -= this.form.get('bid')?.value;
        this.ws.placeBid(this.bid, this.id);
      }
      else{
        this.snackbar.open('Place a bid that is higher than the current bid', 'Got it!');
      }
    }, 1000);
  }
}
