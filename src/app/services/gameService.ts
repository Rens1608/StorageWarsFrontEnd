import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {Game} from '../models/Game';

@Injectable()
export class GameService {

  private gameUrl: string;

  constructor(private http: HttpClient) {
    this.gameUrl = 'http://localhost:8090/game';
  }

  public create(game: Game){
    return this.http.post(this.gameUrl, game, {responseType: 'text'});
  }

  public getAll(): Observable<Game[]>{
    return this.http.get<Game[]>(this.gameUrl + '/findAll');
  }

  public joinGame(id: number, player: Player) {
    return this.http.put(this.gameUrl + '/join/' + id, player, {responseType: 'text'});
  }
}
