import Phaser from 'phaser';
import StartScene from '../scripts/scenes/StartScene';
import BootScene from '../scripts/scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  type: Phaser.AUTO, // use webGL if possible, if no - canvas
  width: 1280, // width of Canvas (should take from background size)
  height: 720, // height of Canvas
  scene: [BootScene, PreloadScene, StartScene, GameScene], // array of game scenes. Queue is important
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

new Phaser.Game(config);
