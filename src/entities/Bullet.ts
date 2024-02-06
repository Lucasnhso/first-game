import { Player } from './';

export class Bullet {
  private scene: Phaser.Scene;
  private player: Player;
  gameObject:  Phaser.Physics.Arcade.Image;

  constructor( player: Player, scene: Phaser.Scene) {
    this.player = player;
    this.scene = scene;
    this.create()
  }
  
  private create() {
    const x = this.player.gameObject.flipX ? this.player.gameObject.x - 40 : this.player.gameObject.x + 40;
    const y = this.player.gameObject.y - 18;
  
    this.gameObject = this.scene.physics.add.image(x, y, "bullet").setScale(0.1)
  
    if(this.player.gameObject.flipX) {
      this.gameObject.setVelocityX(-700)
      this.gameObject.setFlipX(true);
    } else {
      this.gameObject.setVelocityX(700)
    }
  }
  static loadSprites(scene: Phaser.Scene) {
    scene.load.image("bullet", "./assets/bullet.png");
  }
}

