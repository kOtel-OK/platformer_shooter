import Phaser from 'phaser';
import Player from '../Player';
import Enemies from '../Enemies';
import Fire from '../Fire';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.fire = Fire.generate(this);
  }

  update() {
    const { width } = this.game.config;
    // Checking and reset tilePosition to avoid of big numbers
    if (this.bg.tilePositionX >= width * 1.6) this.bg.tilePositionX = 0;

    this.player.move();
    this.bg.tilePositionX += 0.6;
  }

  createBackground() {
    const { width, height } = this.game.config;

    this.bg = this.add.tileSprite(0, 0, width, height, 'bg').setOrigin(0, 0);
  }
}

export default GameScene;
