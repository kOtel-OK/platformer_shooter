import EnemiesGlobal from './EnemiesGlobal';

class Bullet extends EnemiesGlobal {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
  }

  static generate(scene, x, y) {
    return new Bullet(scene, x, y, 'bullet');
  }

  setAlive(status) {
    // deactivating of physics body
    this.body.enable = status; // this - current game object
    // hide game object
    this.setVisible(status);
    // set to inactive
    this.setActive(status);
  }
}

export default Bullet;
