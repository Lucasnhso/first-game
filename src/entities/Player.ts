import MainScene from "../scenes/MainScene";
import { playerSpriteKeys } from "../utils/consts";
import { generateRandomCoordinates } from "../utils/generateRandomCoordinates";

interface PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  isAttacking?: boolean;
}
export class Player {
  private scene: MainScene;
  gameObject: PlayerSprite;
  
  constructor(scene: MainScene){
    this.scene = scene;
    const { x, y } = generateRandomCoordinates();
    this.create(x, y);
  }

  private create(x: number, y: number): void {
    this.gameObject = this.scene.physics.add.sprite(x, y, playerSpriteKeys.idle);
    this.gameObject.anims.play(playerSpriteKeys.idle, true);

    this.gameObject.on(
      'animationcomplete',
      (animation, frame) => {
        if (animation.key === playerSpriteKeys.attack) {
          this.gameObject.isAttacking = false;
        }
      },
      this.scene
    );
  }
  static createAnimations (scene: Phaser.Scene): void {
    if(!scene.anims.exists(playerSpriteKeys.idle)) {
      scene.anims.create({
        key: playerSpriteKeys.idle,
        frames: scene.anims.generateFrameNames(playerSpriteKeys.idle, {
          start: 0,
          end: 7
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
      });
    }
    if(!scene.anims.exists(playerSpriteKeys.walk)) {
      scene.anims.create({
        key: playerSpriteKeys.walk,
        frames: scene.anims.generateFrameNames(playerSpriteKeys.walk, {
          start: 0,
          end: 6
        }),
        frameRate: 8,
        repeat: -1
      });
    }
    if(!scene.anims.exists(playerSpriteKeys.attack)) {
      scene.anims.create({
        key: playerSpriteKeys.attack,
        frames: scene.anims.generateFrameNames(playerSpriteKeys.attack, {
          start: 0,
          end: 3
        }),
        frameRate: 12,
        repeat: 0
      });
    }
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
