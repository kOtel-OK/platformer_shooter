import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
  velocity = 650;

  constructor(scene) {
    super(scene, 150, scene.game.config.height / 2, 'dragon', 'dragon1');
    this.scene = scene;
    this.init();
    this.animate();
  }

  init() {
    this.scene.add.existing(this); // Adding sprite (prefab) to scene
    this.scene.physics.add.existing(this); // Including prefab to the physic engine
    this.body.enable = true;
  }

  move() {
    const { top, bottom, left, right } = this.scene.player.getBounds();
    const { height, width } = this.scene.game.config;

    this.body.setVelocity(0);

    if (this.scene.cursors.up.isDown && top > 0) {
      this.body.setVelocityY(-this.velocity);
    }
    if (this.scene.cursors.down.isDown && bottom < height) {
      this.body.setVelocityY(this.velocity);
    }
    if (this.scene.cursors.left.isDown && left > 0) {
      this.body.setVelocityX(-this.velocity);
    }
    if (this.scene.cursors.right.isDown && right < width) {
      this.body.setVelocityX(this.velocity);
    }
  }

  animate() {
    // generate set of texture frames
    const frames = this.scene.anims.generateFrameNames('dragon', {
      prefix: 'dragon',
      start: 1,
      end: 6,
    });

    // create a new animation based on the frames set
    this.scene.anims.create({
      key: 'fly',
      frames,
      frameRate: 20,
      repeat: -1,
    });
    // run animation
    this.play('fly');
  }
}

export default Player;
