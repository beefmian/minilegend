import PlayerMod from "./PlayerMod";
import WarriorCtr from "./WarriorCtr";
import { gameAnimation } from "../common/gFunc";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("role/PlayerCtr")
export default class PlayerCtr<T extends PlayerMod> extends WarriorCtr<T> {
    
    // private model: PlayerMod = new PlayerMod(this);
    

    start() {
        this.setModel(new PlayerMod(this));
        this.weapon_res_id = 1700;
        super.start();
    }


    ptest(){
        
    }
}
