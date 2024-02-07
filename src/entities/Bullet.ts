import MainScene from '../scenes/MainScene';
import { bulletImageKey } from '../utils/consts';
import { Player } from './';

export class Bullet {
  private scene: MainScene;
  private player: Player;
  gameObject: Phaser.Physics.Arcade.Image;

  constructor( player: Player, scene: MainScene) {
    this.player = player;
    this.scene = scene;
    this.create();
    this.scene.bullets.push(this)
    this.addCollisions()
    
    this.gameObject.on('destroy', () => {
      this.scene.bullets = this.scene.bullets.filter(bullet => bullet !== this);
    })
  }
  private addCollisions() {
    this.scene.physics.add.collider(
      this.gameObject,
      this.scene.water,
      () => {
        this.scene.bullets = this.scene.bullets.filter(e => e !== this)
        this.gameObject.destroy();
      }
    );

    this.scene.physics.add.collider(
      this.scene.slimes.map(e => e.gameObject),
      this.gameObject,
      (bullet, slime) => {
        bullet.destroy(true);
        slime.destroy(true);
        this.scene.points++
        console.log(this.scene.points)
      }
    );
  }
  private create() {
    const x = this.player.gameObject.flipX ? this.player.gameObject.x - 40 : this.player.gameObject.x + 40;
    const y = this.player.gameObject.y - 18;
  
    this.gameObject = this.scene.physics.add.image(x, y, bulletImageKey).setScale(0.1)
  
    if(this.player.gameObject.flipX) {
      this.gameObject.setVelocityX(-700)
      this.gameObject.setFlipX(true);
    } else {
      this.gameObject.setVelocityX(700)
    }
  }
  static loadSprites(scene: Phaser.Scene) {
    scene.load.image(bulletImageKey, "./assets/bullet.png");
  }
}

