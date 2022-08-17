import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    console.log('Game has been started!');
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }
}

export default GameScene;
