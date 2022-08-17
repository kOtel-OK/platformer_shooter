import Phaser from 'phaser';
import background from '../../sprites/background.png';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bg', background);
  }

  create() {
    this.scene.start('Preload');
  }
}

export default BootScene;
