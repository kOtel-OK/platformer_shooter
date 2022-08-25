import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
  velocity = 650;

  constructor(scene) {
    super(scene, 150, scene.game.config.height / 2, 'dragon', 'dragon1');
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this); // Adding sprite (prefab) to scene
    this.scene.physics.add.existing(this); // Including prefab to the physic engine
    this.body.enable = true;
  }

  move() {
    this.body.setVelocity(0);

    if (this.scene.cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    }
    if (this.scene.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }
    if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    }
    if (this.scene.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }
  }
}

export default Player;
