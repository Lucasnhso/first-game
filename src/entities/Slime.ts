import * as Phaser from 'phaser';

const spritesKey = {
  idle: 'slime_idle'
}

export class Slime {
  sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.create(x, y);
  }
  
  private create(x: number, y: number): void {
    this.createAnimations();
    this.sprite = this.scene.physics.add.sprite(x, y, spritesKey.idle).setScale(2);
    this.sprite.anims.play(spritesKey.idle, true);
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
      callbackScope: this.sprite,
    });
  }
  private changeSlimeDirection() {
    return () => {
      const speed = 50;
      const direction = Phaser.Math.RND.pick([-1, 1]);
      const velocity = speed * direction
      const horizontalOrVertical = Phaser.Math.RND.pick(['X', 'Y']);
    
      if(horizontalOrVertical === 'X') {
        this.sprite.setVelocityX(velocity);
        this.sprite.setVelocityY(0);
      } else {
        this.sprite.setVelocityX(0);
        this.sprite.setVelocityY(velocity);
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
