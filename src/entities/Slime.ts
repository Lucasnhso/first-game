import * as Phaser from 'phaser';

const spritesKey = {
  idle: 'slime_idle'
}

export class Slime {
  gameObject: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.create(x, y);
  }
  
  private create(x: number, y: number): void {
    this.createAnimations();
    this.gameObject = this.scene.physics.add.sprite(x, y, spritesKey.idle).setScale(2);
    this.gameObject.anims.play(spritesKey.idle, true);
    this.addMovimentation()
  }
  private createAnimations(): void {
    this.scene.anims.create({
      key: spritesKey.idle,
      frames: this.scene.anims.generateFrameNames(spritesKey.idle, {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1,
  
    });
  }
  private addMovimentation() {
    this.scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: this.changeSlimeDirection(),
      callbackScope: this.gameObject,
    });
  }
  private changeSlimeDirection() {
    return () => {
      const speed = 50;
      const direction = Phaser.Math.RND.pick([-1, 1]);
      const velocity = speed * direction
      const horizontalOrVertical = Phaser.Math.RND.pick(['X', 'Y']);
    
      if(horizontalOrVertical === 'X') {
        this.gameObject.setVelocityX(velocity);
        this.gameObject.setVelocityY(0);
      } else {
        this.gameObject.setVelocityX(0);
        this.gameObject.setVelocityY(velocity);
      }
    }
  }
  static loadSprites(scene: Phaser.Scene): void {
    scene.load.spritesheet(spritesKey.idle, './assets/slime/idle.png', {
      frameWidth: 20,
      frameHeight: 17,
      spacing: 0
    });
  };
}
