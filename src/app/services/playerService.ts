import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable()
export class PlayerService {

  private playerUrl: string;

  constructor(private http: HttpClient) {
    this.playerUrl = 'http://localhost:8090/player';
  }

  public register(player: Player): Observable<string> {
    return this.http.post(this.playerUrl, player, {responseType: 'text'});
  }

  public update(player: Player): Observable<Player> {
    return this.http.put<Player>(this.playerUrl, player);
  }

  public delete(playerId: number):void {
    this.http.delete<Player>(this.playerUrl + '/' + playerId);
  }

  public getPlayerById(playerId: number): Observable<Player> {
    return this.http.get<Player>(this.playerUrl + '/' + playerId);
  }

  public login(player: Player): Observable<Player> {
    return this.http.get<Player>(this.playerUrl + '/' + player.name + '/' + player.password);
  }
}
