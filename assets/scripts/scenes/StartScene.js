import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  constructor() {
    super('Start'); // Pass the scene Key
  }

  preload() {}

  create() {
    this.createBackground();
    this.createStartGameText();
    this.playGame();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

  createStartGameText() {
    const { width: sceneWidth, height: sceneHeight } = this.game.config;

    const startText = this.add
      .text(0, 0, 'Tap to Start', {
        fontFamily: '"Press Start 2P"',
        color: '#fff',
        fontSize: '40px',
      })
      .setAlign('center');

    startText.setPosition(sceneWidth / 2, 600).setOrigin(0.5, 0.5);
  }

  playGame() {
    this.input.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}

export default StartScene;
