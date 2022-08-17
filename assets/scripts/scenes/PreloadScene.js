import Phaser from 'phaser';
import WebFontFile from '../WebFontFile';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create() {
    this.scene.start('Start');
  }
}

export default PreloadScene;
