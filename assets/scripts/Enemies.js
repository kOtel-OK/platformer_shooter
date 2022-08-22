import Phaser from 'phaser';
import Enemy from './Enemy';

class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.enemiesCreated = 0;
    this.enemiesAmountMax = 10;
    this.timeoutEvent = this.scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback: this.onTimerTick,
      callbackScope: this,
    });
    this.scene.physics.add.group();
  }

  onTimerTick() {
    if (this.enemiesCreated >= this.enemiesAmountMax) {
      this.timeoutEvent.remove();
    } else {
      this.createEnemy();
    }
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      enemy.reset(this.scene);
    }

    this.enemiesCreated++;
    enemy.move();
  }
}

export default Enemies;
