import Phaser from 'phaser';
import Player from '../Player';
import Enemies from '../Enemies';
import Fire from '../Fire';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.score = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.bulletsGroup = this.physics.add.group(); // Creating group for bullets
  }

  create() {
    this.createBackground();
    this.createScoreText();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.fire = new Fire(this);
    this.createCompleteEvents();
    this.addOverlap();
    this.boomAnimate();
  }

  update() {
    const { width } = this.game.config;
    const created = this.enemies.enemiesAmountMax;

    if (this.bg.tilePositionX >= width * 1.6) this.bg.tilePositionX = 0;

    // If no enemie on the scene - calling enemiesdestroyed event
    if (this.enemies.enemiesDestroyed === created && created !== 0)
      this.enemies.emit('enemiesdestroyed', true);

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
      this.fire.reset();
      target.play('booms');

      target.once(
        'animationcomplete',
        function () {
          // Adding destroyed enemy to the enemiesDestroyed counter
          this.enemies.enemiesDestroyed++;
          this.score += target.setObjectRatio();
          this.scoreText.setText(`Score: ${this.score}`);
          target.setAlive(false);
          target.setTexture('enemy');
        },
        this
      );
    }
  }

  // Overlap player with target
  onObjectsOverlap(source, target) {
    target.setAlive(false);
    target.setAlive.call(source, false);
    target.setAlive.call(this.fire, false);
    this.events.emit('killed', false);
  }

  // Overlap player with bullet
  onBulletOverlap(source, target) {
    target.setAlive.call(source, false);
    target.setAlive.call(this.fire, false);
    this.events.emit('killed', false);
  }

  createCompleteEvents() {
    this.events.once('killed', this.onComplete, this);
    this.enemies.once('enemiesdestroyed', this.onComplete, this);
  }

  onComplete(success) {
    this.scene.start('Start', {
      totalScore: this.score,
      gameComplete: success,
    });
  }

  boomAnimate() {
    const frames = this.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4,
    });

    this.anims.create({
      key: 'booms',
      frames,
      frameRate: 15,
      repeat: 0,
    });
  }

  createBackground() {
    const { width, height } = this.game.config;

    this.bg = this.add.tileSprite(0, 0, width, height, 'bg').setOrigin(0, 0);
  }

  createScoreText() {
    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontFamily: '"Press Start 2P"',
      color: '#fff',
      fontSize: '30px',
    });
  }
}

export default GameScene;
