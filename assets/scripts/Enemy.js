import EnemiesGlobal from './EnemiesGlobal';
import Bullet from './Bullet';

class Enemy extends EnemiesGlobal {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);

    this.bulletTimerEvent = this.scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: this.onBulletTimerTick,
      callbackScope: this,
    });
  }

  static generateAttr(scene) {
    const { width: sceneWidth, height: sceneHeight } = scene.game.config;
    const enemyWidth = scene.textures.list.enemy.source[0].width;
    const enemyHeight = scene.textures.list.enemy.source[0].height;

    return {
      x: sceneWidth + enemyWidth / 4,
      y: Phaser.Math.Between(enemyHeight, sceneHeight - enemyHeight),
      frame: Phaser.Math.Between(1, 4),
    };
  }

  static generate(scene) {
    const enemyAttrs = Enemy.generateAttr(scene);

    return new Enemy(
      scene,
      enemyAttrs.x,
      enemyAttrs.y,
      'enemy',
      `enemy${enemyAttrs.frame}`
    );
  }

  onBulletTimerTick() {
    if (!this.active) {
      this.bullet.setAlive(false);
    } else {
      this.bullet = Bullet.generate(
        this.scene,
        this.body.x,
        this.body.y + this.body.height / 2
      );

      this.scene.bulletsGroup.add(this.bullet); // Adding each bullet to the group
      this.bullet.move(this.setObjectSpeed());
    }
  }

  reset(scene) {
    const enemyAttrs = Enemy.generateAttr(scene);

    this.x = enemyAttrs.x;
    this.y = enemyAttrs.y;

    this.setFrame(`enemy${enemyAttrs.frame}`);
    this.setAlive(true);
  }

  update() {
    if (this.active && this.body.x < -this.width) {
      this.setAlive(false);
    }
  }
}

export default Enemy;
