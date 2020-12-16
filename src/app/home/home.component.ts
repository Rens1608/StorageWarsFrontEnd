import { Component, OnInit } from '@angular/core';
import {Player} from '../models/player';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string | undefined;
  balance: number | undefined;
  player: Player;
  constructor(private router: Router) {
    this.player = new Player();
  }

  ngOnInit(): void {
    const retrievedItem = sessionStorage.getItem('currentPlayer');
    if (retrievedItem != null) {
        console.log(retrievedItem);
        this.player = JSON.parse(retrievedItem);
        this.username = this.player.name;
        this.balance = this.player.balance;
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
