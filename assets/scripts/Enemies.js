import Phaser from 'phaser';
import Enemy from './Enemy';

class Enemies extends Phaser.Physics.Arcade.Group {
  velocity = 300;

  constructor(scene) {
    super();
    this.scene = scene;
    this.createEnemies();
  }

  enemyCreateTimeout() {
    this.timeoutEvent = this.scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback() {
        this.onTimerTick();
      },
      callbackScope: this,
    });
  }

  onTimerTick() {
    if (this.getLength() >= 10) {
      this.scene.time.removeEvent(this.timeoutEvent);
    }
    let enemy = Enemy.generate(this.scene);
    this.add(enemy);
    enemy.move();
  }

  createEnemies() {
    this.scene.physics.add.group();
    this.enemyCreateTimeout();
  }
}

export default Enemies;
