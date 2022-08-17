import Phaser from 'phaser';
import WebFontFile from '../WebFontFile';
import dragonPNG from '../../sprites/dragon.png';
import dragonJSON from '../../sprites/dragon.json';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.atlas('dragon', dragonPNG, dragonJSON);
  }

  create() {
    this.scene.start('Start');
  }
}

export default PreloadScene;
