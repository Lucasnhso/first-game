import * as Phaser from 'phaser';
import { defaultSlimeVelocity, slimeSpriteKey } from '../utils/consts';
import MainScene from '../scenes/MainScene';
import { Player } from './Player';
import { generateRandomCoordinates } from '../utils/generateRandomCoordinates';

export class Slime {
  gameObject: Phaser.Physics.Arcade.Sprite;
  changeDirectionEvent: Phaser.Time.TimerEvent
  private scene: MainScene;
  private player: Player;
  private water;
  
  constructor(scene: MainScene) {
    this.scene = scene;
    this.player = scene.player
    this.water = scene.water;
    const { x, y } = generateRandomCoordinates();

    this.create(x, y);
    this.addCollision();

    this.gameObject.on('destroy', () => {
      this.scene.slimes = this.scene.slimes.filter(slime => slime !== this);
      this.scene.time.removeEvent(this.changeDirectionEvent);
    })
  }
  
  private create(x: number, y: number): void {
    this.gameObject = this.scene.physics.add.sprite(x, y, slimeSpriteKey).setScale(2);
    this.gameObject.anims.play(slimeSpriteKey, true);
    this.addRandomMovimentation()
  }
  static createAnimations(scene: Phaser.Scene): void {
    if(!scene.anims.exists(slimeSpriteKey)) {
      scene.anims.create({
        key: slimeSpriteKey,
        frames: scene.anims.generateFrameNames(slimeSpriteKey, {
          start: 0,
          end: 6
        }),
        frameRate: 8,
        repeat: -1,
      });
    }
  }
  private addCollision() {
    this.addPlayerCollision();
    this.scene.physics.add.collider(this.gameObject, this.water);
  }
  private addPlayerCollision() {
    this.scene.physics.add.collider(
      this.player.gameObject,
      this.gameObject,
      this.handlePlayerSlimeCollision
    );
  }
  handlePlayerSlimeCollision = () => {
    this.scene.scene.start('game-over', { score: this.scene.score})
  }
  private addRandomMovimentation() {
    this.changeDirectionEvent = this.scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: this.changeSlimeDirection(),
      callbackScope: this.gameObject,
    });
  }
  private changeSlimeDirection() {
    return () => {
      const direction = Phaser.Math.RND.pick([-1, 1]);
      const velocity = defaultSlimeVelocity * direction
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
    scene.load.spritesheet(slimeSpriteKey, './assets/slime/idle.png', {
      frameWidth: 20,
      frameHeight: 17,
      spacing: 0
    });
  };
}
