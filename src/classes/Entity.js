class Entity {
  constructor(x, y, size, atributes) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.atributes = { ...atributes };
  }

  action(verb, world) {
    console.log(`Verb: ${verb}`);
  }

  draw(context) {
    context.fillStyle = this.atributes.color || "white";
    context.textBaseline = "hanging";
    context.font = "16px Helvetica";
    context.fillText(
      this.atributes.ascii,
      this.x * this.size +
        (this.atributes.offset ? this.atributes.offset.x : 0),
      this.y * this.size + (this.atributes.offset ? this.atributes.offset.y : 0)
    );
  }
}

export default Entity;
