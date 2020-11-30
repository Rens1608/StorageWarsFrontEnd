import {Game} from './Game';
import {GarageItem} from './GarageItem';

export class GarageBox {
  id: number;
  worth: number;
  items: GarageItem[];
  game: Game;
}
