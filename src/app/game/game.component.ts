import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/gameService';
import {Game} from '../models/Game';
import {Player} from '../models/player';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  player: Player;
  private gameList: Game[];
  playerCount: number | undefined;
  webSocketEndPoint: string = 'http://localhost:8090/storagewars';
  topic: string = '/topic/game/1';
  stompClient: any;

  constructor(private gameService: GameService) {
    this.game = new Game();
    this.game.players = [];
  }

  ngOnInit(): void {
    this.refreshGameList();
  }

  createGame(): void {
    this.gameService.create(this.game);
    this.refreshGameList();
  }
  refreshGameList(): void{
    this.setPlayerCount(this.game);
    this.gameService.getAll().subscribe(data => {this.gameList = data; });
  }

  joinGame(id: number): void {
    this.connect();
    const retrievedItem = localStorage.getItem('currentPlayer');
    if (retrievedItem != null ) {
      this.player = JSON.parse(retrievedItem);
    }
    //this.gameService.joinGame(id, this.player).subscribe(() => this.refreshGameList());
  }

  connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, frame => {
      _this.stompClient.subscribe(_this.topic, sdkEvent => {
        _this.onMessageReceived(sdkEvent);
      });
    // _this.stompClient.reconnect_delay = 2000;
   }, this.errorCallBack);
  }

  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
   }, 5000);
  }
  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
  }

  setPlayerCount(game: Game): void {
    if (this.game.players === undefined){
      this.playerCount = 0;
    }else{
      this.playerCount = game.players?.length;
    }
  }
}
