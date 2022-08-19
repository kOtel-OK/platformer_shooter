import Phaser from 'phaser';

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.init();
  }

  static generate(scene) {
    const { width: sceneWidth, height: sceneHeight } = scene.game.config;
    const enemyWidth = scene.textures.list.enemy.source[0].width;
    const enemyHeight = scene.textures.list.enemy.source[0].height;

    const x = sceneWidth + enemyWidth / 4;
    const y = Phaser.Math.Between(enemyHeight, sceneHeight - enemyHeight);

    const frame = Phaser.Math.Between(1, 4);

    return new Enemy(scene, x, y, 'enemy', `enemy${frame}`);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.active && this.body.x < -this.width) {
      this.setAlive(false);
    }
  }

  setAlive(status) {
    // deactivating of physics body
    this.body.enable = status; // this - current game object
    // hide game object
    this.setVisible(status);
    // set to inactive
    this.setActive(status);
  }

  setEnemySpeed() {
    const frame = Number(this.frame.name.slice(-1));
    let velocity;

    switch (frame) {
      case 1:
        velocity = -100;
        break;
      case 2:
        velocity = -150;
        break;
      case 3:
        velocity = -200;
        break;
      case 4:
        velocity = -250;
        break;
    }
    return velocity;
  }

  move() {
    this.body.setVelocityX(this.setEnemySpeed());
  }
}

export default Enemy;
