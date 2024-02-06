import { playerSpriteKeys } from "../utils/consts";

interface PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  isAttacking?: boolean;
}

export class Player {
  private scene: Phaser.Scene;
  gameObject: PlayerSprite;

  constructor(scene: Phaser.Scene, x: number, y: number){
    this.scene = scene;

    this.create(x, y);
  }

  private create(x: number, y: number): void {
    this.gameObject = this.scene.physics.add.sprite(x, y, playerSpriteKeys.idle);
    this.createAnimations();
  }
  private createAnimations (): void {
    this.scene.anims.create({
      key: playerSpriteKeys.idle,
      frames: this.scene.anims.generateFrameNames(playerSpriteKeys.idle, {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    });
  
    this.scene.anims.create({
      key: playerSpriteKeys.walk,
      frames: this.scene.anims.generateFrameNames(playerSpriteKeys.walk, {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1
    });
  
    this.scene.anims.create({
      key: playerSpriteKeys.attack,
      frames: this.scene.anims.generateFrameNames(playerSpriteKeys.attack, {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: 0
    });
  
    this.gameObject.on(
      'animationcomplete',
      (animation, frame) => {
        if (animation.key === playerSpriteKeys.attack) {
          this.gameObject.isAttacking = false;
        }
      },
      this.scene
    );
  };

  static loadSprites(scene: Phaser.Scene): void {
    scene.load.spritesheet(playerSpriteKeys.idle, './assets/player/idle.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  
    scene.load.spritesheet(playerSpriteKeys.walk, './assets/player/walk.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  
    scene.load.spritesheet(playerSpriteKeys.attack, './assets/player/attack.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  };
}
