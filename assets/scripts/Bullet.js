import EnemiesGlobal from './EnemiesGlobal';

class Bullet extends EnemiesGlobal {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
  }

  static generate(scene, x, y) {
    return new Bullet(scene, x, y, 'bullet');
  }
}

export default Bullet;
