import Player from './Player';

class Fire extends Phaser.GameObjects.Sprite {
  velocity = 650;
  fireVelocity = 1500;

  constructor(scene) {
    super(scene);

    this.x = scene.player.x + 85;
    this.y = scene.player.y;
    this.key = 'fire';
    this.init();
  }

  init() {
    this.setTexture(this.key);
    this.scene.add.existing(this); // Adding sprite (prefab) to scene
    this.scene.physics.add.existing(this); // Including prefab to the physic engine
    this.body.enable = true;
  }

  reset() {
    const { x, y } = this.scene.player;

    this.x = x + 60;
    this.y = y;
    this.isFired = false;
  }

  move() {
    if (this.x > this.scene.game.config.width + this.width) this.reset();
    if (this.isFired) return;

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

    if (this.scene.cursors.space.isDown) {
      this.body.setVelocityX(this.fireVelocity);
      this.isFired = true;
    }
  }
}

export default Fire;
