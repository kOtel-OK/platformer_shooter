import Phaser from 'phaser';
import WebFontFile from '../WebFontFile';
import dragonPNG from '../../sprites/dragon.png';
import fire from '../../sprites/fire.png';
import dragonJSON from '../../sprites/dragon.json';
import enemyPNG from '../../sprites/enemy.png';
import enemyJSON from '../../sprites/enemy.json';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.image('fire', fire);
    this.load.atlas('dragon', dragonPNG, dragonJSON);
    this.load.atlas('enemy', enemyPNG, enemyJSON);
  }

  create() {
    this.scene.start('Start');
  }
}

export default PreloadScene;
