import { GameArena } from '../model/game/app.core.model.game.gameArena';
import { ArenaPlayer } from '../model/game/app.core.model.game.arenaPlayer';
import { Tile } from '../model/game/app.core.model.game.tile';
import { Map } from '../model/game/app.core.model.game.map';

export const GameArenaFactory = {

    Create: (arena: GameArena) => {
        const game = new GameArena(); 

        game.Attacker = null;
        if (arena.Attacker) {
            game.Attacker = new ArenaPlayer();
            game.Attacker.Buildings = arena.Attacker.Buildings;
            game.Attacker.Tanks = arena.Attacker.Tanks;
            game.Attacker.UserId = arena.Attacker.UserId;
            game.Attacker.UserType = arena.Attacker.UserType;
        }

        game.Defender = null;
        if (arena.Defender) {
            game.Defender = new ArenaPlayer();
            game.Defender.Buildings = arena.Defender.Buildings;
            game.Defender.Tanks = arena.Defender.Tanks;
            game.Defender.UserId = arena.Defender.UserId;
            game.Defender.UserType = arena.Defender.UserType;
        }
        

        game.Map = new Map(game.Attacker, game.Defender);
        game.Uid = arena.Uid;

        return game;
    }

}