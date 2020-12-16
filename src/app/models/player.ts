import {Game} from './Game';

export class Player{
    id: number | undefined;
    name: string | undefined;
    password: string | undefined;
    balance: number | undefined;
    game: Game | undefined;
}
