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
  player: Player;
  constructor(private router: Router) {
    this.player = new Player();
  }

  ngOnInit(): void {
    const retrievedItem = localStorage.getItem('currentPlayer');
    if (retrievedItem != null ) {
      this.player = JSON.parse(retrievedItem);
      this.username = this.player.name;
    }
    else{
      // @ts-ignore
      this.router.navigate('/login');
    }
  }

}
