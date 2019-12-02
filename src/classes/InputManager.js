class InputManager {
  observer = [];

  subscribe(fn) {
    this.observer.push(fn);
  }

  unsubscribe(fn) {
    this.observer = this.observer.filter(subscriber => subscriber !== fn);
  }

  broadcast(action, data) {
    for (let subscriber of this.observer) {
      subscriber(action, data);
    }
  }

  handleKeys = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case 65: // A Key
      case 37: // Left Arrow
        this.broadcast("move", { x: -1, y: 0 });
        break;
      case 87: // W Key
      case 38: // Up Arrow
        this.broadcast("move", { x: 0, y: -1 });
        break;
      case 68: // D Key
      case 39: // Right Arrow
        this.broadcast("move", { x: 1, y: 0 });
        break;
      case 83: // S Key
      case 40: // Down Arrow
        this.broadcast("move", { x: 0, y: 1 });
        break;
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}

export default InputManager;
