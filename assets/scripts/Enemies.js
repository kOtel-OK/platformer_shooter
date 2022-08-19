import Phaser from 'phaser';
import Enemy from './Enemy';

class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.enemiesAmount = 10;
    this.timeoutEvent = this.scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback: this.onTimerTick,
      callbackScope: this,
    });
    this.createEnemies();
  }

  onTimerTick() {
    if (this.getLength() >= this.enemiesAmount) {
      this.timeoutEvent.remove();
    }

    let enemy = Enemy.generate(this.scene);

    this.add(enemy);
    enemy.move();
  }

  createEnemies() {
    this.scene.physics.add.group();
  }
}

export default Enemies;
