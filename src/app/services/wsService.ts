import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Injectable} from '@angular/core';
import {Player} from '../models/player';
import {Router} from '@angular/router';
import {Game} from '../models/Game';
@Injectable()
export class WsService {

  constructor(private router: Router) {
  }

  webSocketEndPoint = 'http://localhost:8090/storagewars';
  stompClient: any;
  private message!: any;
  private players!: [];

  getPlayers(): { id: number; name: string; }[]{
    return this.players;
  }

  connect(id: number): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const topic = '/topic/game/' + id.toString();
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(topic, (sdkEvent: string) => {
        this.onMessageReceived(sdkEvent);
      });
    }, this.errorCallBack);
  }
  errorCallBack(error: string): void {
    console.log('errorCallBack -> ' + error);
  }
  onMessageReceived(message: any): void {
    this.message = JSON.parse(message.body);
    switch (this.message.body.method) {
      case 'JOIN':
        this.players = JSON.parse(this.message.body.message);
        break;
      case 'LEAVE':
        this.players = JSON.parse(this.message.body.message);
        break;
      case 'BID':
        break;
      case 'STARTGAME':
        const id = JSON.parse(this.message.body.message);
        this.router.navigate(['/game/started/' + id.toString()]);
        break;
    }
  }

  joinGame(player: any, id: number): void {
    this.stompClient.send('/app/join/' + id, {}, JSON.stringify(player));
  }

  leaveGame(player: any, id: number): void{
    this.stompClient.send('/app/leave/' + id, {}, JSON.stringify(player));
    this.stompClient.unsubscribe('/topic/game/' + id);
  }

  startGame(id: number): void{
    this.stompClient.send('/app/start/' + id, {});
  }
  setupGame(id: number): void{
    this.stompClient.send('/app/setup/' + id, {});
  }

  placeBid(value: any | undefined): void {
    //this.stompClient.send('');
  }
}
