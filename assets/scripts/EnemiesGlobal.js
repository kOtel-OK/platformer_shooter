import Phaser from 'phaser';

class EnemiesGlobal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.scene.events.on('update', this.update, this);
  }

  setAlive(status) {
    // deactivating of physics body
    this.body.enable = status; // this - current game object
    // hide game object
    this.setVisible(status);
    // set to inactive
    this.setActive(status);

    // paused timer if object is inactive
    if (this.bulletTimerEvent) this.bulletTimerEvent.paused = !status;
  }

  setObjectSpeed() {
    const frame = Number(this.frame.name.slice(-1));
    let velocity;
    // for bullet moving
    if (!frame) {
      velocity = 200;
      return -velocity;
    }

    switch (frame) {
      case 1:
        velocity = 100;
        break;
      case 2:
        velocity = 150;
        break;
      case 3:
        velocity = 200;
        break;
      case 4:
        velocity = 350;
        break;
    }
    return -velocity;
  }

  move(velocity = 0) {
    this.body.setVelocityX(velocity + this.setObjectSpeed());
  }
}

export default EnemiesGlobal;
