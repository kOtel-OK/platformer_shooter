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

  /**
   * Set ratio (velocity, scores) for different type of Enemies objects
   * @returns {number} Returns ratio
   */
  setObjectRatio() {
    const frame = Number(this.frame.name.slice(-1));
    let ratio;
    // for bullet moving
    if (!frame) {
      ratio = 200;
      return ratio;
    }

    switch (frame) {
      case 1:
        ratio = 100;
        break;
      case 2:
        ratio = 150;
        break;
      case 3:
        ratio = 200;
        break;
      case 4:
        ratio = 350;
        break;
    }
    return ratio;
  }

  move(velocity = 0) {
    this.body.setVelocityX(velocity + -this.setObjectRatio());
  }
}

export default EnemiesGlobal;
