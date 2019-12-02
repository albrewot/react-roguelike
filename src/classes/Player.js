import colors from "../config/colors";
import Entity from "./Entity";

class Player extends Entity {
  atributes = {
    name: "Player",
    ascii: "@",
    health: 10
  };

  inventory = [];

  move(dx, dy) {
    if (this.atributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }

  // draw(context) {
  //   context.fillStyle = colors.player;
  //   context.textBaseline = "hanging";
  //   context.font = "16px Helvetica";
  //   context.fillText("@", this.x * this.size, this.y * this.size);
  // }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
