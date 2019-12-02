import React, { useRef, useEffect, useState } from "react";
import InputManager from "../classes/InputManager";
import World from "../classes/World";
import Spawner from "../classes/Spawner";

const ReactRogue = ({ width, height, tilesize }) => {
  // const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));
  const canvasRef = useRef();
  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    console.log(`handle input: ${action} : ${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  };

  //Created the world
  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    spawner.spawnMonsters(6);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  //handles the input
  useEffect(() => {
    console.log("Bind input");
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);

    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
    // player.draw(ctx);
  });
  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={styles.canvas}
      ></canvas>
      <ul>
        <li>Inventory</li>
        <li>---</li>
        {world.player.inventory.map((item, index) => (
          <li key={index}>{item.atributes.name}</li>
        ))}
      </ul>
      <ul>
        <li>Log</li>
        <li>---</li>
        {world.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row"
  },
  canvas: {
    border: "1px solid black",
    background: "DimGray"
  }
};

export default ReactRogue;
