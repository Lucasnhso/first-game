interface PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  isAttacking?: boolean;
}

export class Player {
  idleKey: string;
  scene: Phaser.Scene;
  sprite: PlayerSprite;

  constructor(scene: Phaser.Scene, x: number, y: number){
    const idleKey = 'player_idle'
    this.idleKey = idleKey;
    this.scene = scene;

    this.create(x, y);
  }

  private create(x: number, y: number): void {
    this.sprite = this.scene.physics.add.sprite(x, y, this.idleKey);
    this.createAnimations();
  }
  private createAnimations (): void {
    this.scene.anims.create({
      key: 'player_idle',
      frames: this.scene.anims.generateFrameNames('player_idle', {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    });
  
    this.scene.anims.create({
      key: 'player_walk',
      frames: this.scene.anims.generateFrameNames('player_walk', {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1
    });
  
    this.scene.anims.create({
      key: 'player_attack',
      frames: this.scene.anims.generateFrameNames('player_attack', {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: 0
    });
  
    this.sprite.on(
      'animationcomplete',
      (animation, frame) => {
        if (animation.key === 'player_attack') {
          this.sprite.isAttacking = false;
        }
      },
      this.scene
    );
  };

  static loadSprites(scene: Phaser.Scene): void {
    scene.load.spritesheet('player_idle', './assets/player/idle.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  
    scene.load.spritesheet('player_walk', './assets/player/walk.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  
    scene.load.spritesheet('player_attack', './assets/player/attack.png', {
      frameWidth: 83,
      frameHeight: 64,
      spacing: 45
    });
  };
}
