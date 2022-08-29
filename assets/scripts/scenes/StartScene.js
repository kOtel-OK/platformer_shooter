import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  constructor() {
    super('Start'); // Pass the scene Key
  }

  preload() {}

  create(data) {
    this.createBackground();
    if (data.totalScore !== undefined) {
      this.createTotals(data);
    }

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

  createTotals(data) {
    const { width, height } = this.game.config;

    const textTitle = data.gameComplete ? 'Level Completed' : 'Game Over';
    const textScore = data.totalScore;
    const textStyle = {
      fontFamily: '"Press Start 2P"',
      color: '#fff',
      fontSize: '30px',
    };

    this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(width / 2 - 300, height / 2 - 200, 600, 400);

    this.add
      .text(width / 2, height / 2 - 100, textTitle, textStyle)
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2, `Score: ${textScore}`, textStyle)
      .setOrigin(0.5);
  }

  playGame() {
    this.input.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}

export default StartScene;
