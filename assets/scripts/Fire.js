import Enemy from './Enemy';

class Fire extends Enemy {
  velocity = 650;
  fireVelocity = 1500;

  constructor(scene, x, y, key) {
    super(scene, x, y, key);
  }

  static generate(scene) {
    const { x, y, width } = scene.player;
    return new Fire(scene, x + width / 2, y, 'fire');
  }

  reset() {
    const { x, y, width } = this.scene.player;

    this.x = x + width / 2;
    this.y = y;
    this.isFired = false;
  }

  update() {
    this.move();

    if (this.body.x > this.scene.game.config.width + this.width) {
      this.reset();
    }
  }

  move() {
    if (!this.isFired) this.body.setVelocity(0);
    if (this.isFired) return;

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

    if (this.scene.cursors.space.isDown) {
      this.body.setVelocityX(this.fireVelocity);
      this.isFired = true;
    }
  }
}

export default Fire;
