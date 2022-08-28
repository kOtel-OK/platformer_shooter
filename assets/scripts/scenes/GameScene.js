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
    this.bulletsGroup = this.physics.add.group(); // Creating group for bullets
  }

  create() {
    this.createBackground();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.fire = new Fire(this);
    this.createCompleteEvents();
    this.addOverlap();
  }

  update() {
    const { width } = this.game.config;
    const created = this.enemies.enemiesAmountMax;

    if (this.bg.tilePositionX >= width * 1.6) this.bg.tilePositionX = 0;

    // If no enemie on the scene - calling enemiesdestroyed event
    if (this.enemies.enemiesDestroyed === created && created !== 0)
      this.enemies.emit('enemiesdestroyed');

    this.player.move();
    this.fire.move();
    this.bg.tilePositionX += 0.6;
  }

  addOverlap() {
    this.physics.add.overlap(
      this.fire,
      this.enemies,
      this.onOverlap,
      null,
      this
    );

    this.physics.add.overlap(
      this.enemies,
      this.player,
      this.onObjectsOverlap,
      null,
      this
    );

    this.physics.add.overlap(
      this.bulletsGroup,
      this.player,
      this.onBulletOverlap,
      null,
      this
    );
  }

  // Overlap fire with object
  onOverlap(source, target) {
    if (source.isFired) {
      target.setAlive(false);
      this.enemies.enemiesDestroyed++;
      this.fire.reset();
    }
  }

  // Overlap player with target
  onObjectsOverlap(source, target) {
    target.setAlive(false);
    target.setAlive.call(source, false);
    target.setAlive.call(this.fire, false);
    this.player.emit('killed');
  }

  // Overlap player with bullet
  onBulletOverlap(source, target) {
    target.setAlive.call(source, false);
    target.setAlive.call(this.fire, false);
    this.player.emit('killed');
  }

  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    this.enemies.once('enemiesdestroyed', this.onComplete, this);
  }

  onComplete() {
    this.scene.start('Start');
    console.log('Game Over');
  }

  createBackground() {
    const { width, height } = this.game.config;

    this.bg = this.add.tileSprite(0, 0, width, height, 'bg').setOrigin(0, 0);
  }
}

export default GameScene;
