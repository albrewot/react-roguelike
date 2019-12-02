import Entity from "./Entity";

class Monster extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      world.addToHistory(`Player attacks ${this.atributes.name}!`);
      this.atributes.health = this.atributes.health - 1;
      if (this.atributes.health <= 0) {
        world.remove(this);
        world.addToHistory(`${this.atributes.name} died!`);
      } else {
        world.addToHistory(
          `${this.atributes.name}'s health = ${this.atributes.health}`
        );
        world.player.atributes.health = world.player.atributes.health - 1;
        if (world.player.atributes.health <= 0) {
          world.addToHistory(`You have died`);
        } else {
          world.addToHistory(
            `Your current health is: ${world.player.atributes.health}`
          );
        }
      }
    }
  }
}

export default Monster;
