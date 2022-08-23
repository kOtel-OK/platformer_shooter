import Phaser from 'phaser';
import Fire from './Fire';

class Player extends Phaser.GameObjects.Sprite {
  velocity = 650;

  constructor(scene) {
    super(scene, 150, scene.game.config.height / 2, 'dragon', 'dragon1');
    this.scene = scene;
    this.init();
  }

  init() {
    // this.fire = Fire.generate(this.scene, this.x + this.width / 2, this.y);

    // this.fire.init();

    // console.log(this.fire);
    // this.fire.move();
    // this.isFired = false;

    this.scene.add.existing(this); // Adding sprite (prefab) to scene
    this.scene.physics.add.existing(this); // Including prefab to the physic engine
    this.body.enable = true;

    // this.scene.add.existing(this.fire);
    // this.scene.physics.add.existing(this.fire);
    // this.fire.enable = true;
  }

  move() {
    this.body.setVelocity(0);

    // if (!this.fire.isFired) this.fire.body.setVelocity(0);

    if (this.scene.cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
      // this.fire.body.setVelocityY(-this.velocity);
    }
    if (this.scene.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
      // this.fire.body.setVelocityY(this.velocity);
    }
    if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
      // this.fire.body.setVelocityX(-this.velocity);
    }
    if (this.scene.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
      // this.fire.body.setVelocityX(this.velocity);
    }

    if (this.scene.cursors.space.isDown) {
      // this.fire.body.setVelocityX(1000);
      // this.fire.isFired = true;
    }
  }
}

export default Player;
