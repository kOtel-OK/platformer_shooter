import Phaser from 'phaser';
import WebFontFile from '../WebFontFile';
import dragonPNG from '../../sprites/dragon.png';
import fire from '../../sprites/fire.png';
import bullet from '../../sprites/bullet.png';
import dragonJSON from '../../sprites/dragon.json';
import enemyPNG from '../../sprites/enemy.png';
import enemyJSON from '../../sprites/enemy.json';
import boomPNG from '../../sprites/boom.png';
import boomJSON from '../../sprites/boom.json';
import sounds from 'url:../../sounds/*.mp3';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.image('fire', fire);
    this.load.image('bullet', bullet);
    this.load.atlas('dragon', dragonPNG, dragonJSON);
    this.load.atlas('enemy', enemyPNG, enemyJSON);
    this.load.atlas('boom', boomPNG, boomJSON);
    for (let key in sounds) {
      this.load.audio(key, sounds[key]);
    }
  }

  create() {
    this.scene.start('Start');
  }
}

export default PreloadScene;
