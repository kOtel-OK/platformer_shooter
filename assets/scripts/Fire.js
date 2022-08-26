import Player from './Player';

class Fire extends Player {
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
    super.init();
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

    super.move();

    if (this.scene.cursors.space.isDown) {
      this.body.setVelocityX(this.fireVelocity);
      this.isFired = true;
    }
  }
}

export default Fire;
