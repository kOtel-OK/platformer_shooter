import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.createBackground();

    this.add
      .sprite(150, this.game.config.height / 2, 'dragon', 'dragon1')
      .setOrigin(0, 0);
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }
}

export default GameScene;
