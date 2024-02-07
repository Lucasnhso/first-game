import { Player, Bullet } from '../entities';
import MainScene from '../scenes/MainScene';
import { defaultPlayerVelocity, playerSpriteKeys } from '../utils/consts';

type Movement = 'up' | 'down' | 'left' | 'right' | 'attack';

export class Controls {
  private scene: MainScene;
  private player: Player;
  private controls: Phaser.Types.Input.Keyboard.CursorKeys
  
  constructor(scene: MainScene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.controls = scene.input.keyboard.createCursorKeys();
  }

  config(): void {
    this.player.gameObject.setVelocityX(0);
    this.player.gameObject.setVelocityY(0);

    if (this.player.gameObject.isAttacking) {
      return
    }
    if (this.controls.right.isDown) {
      return this.executeMove('right');
    }
    if (this.controls.left.isDown) {
      return this.executeMove('left');
    }
    if (this.controls.up.isDown) {
      return this.executeMove('up');
    }
    if (this.controls.down.isDown) {
      return this.executeMove('down');
    }
    if (this.controls.space.isDown) {
      return this.executeMove('attack');
    }
    this.player.gameObject.anims.play(playerSpriteKeys.idle, true)
  }

  private executeMove (movement: Movement): void {
    const handlePlayerWalk = (x: number, y:number, flipPlayer?: boolean) =>  {
      if (flipPlayer !== undefined && flipPlayer !== null) {
        this.player.gameObject.setFlipX(flipPlayer);
      }
      this.player.gameObject.anims.play(playerSpriteKeys.walk, true);
      this.player.gameObject.setVelocity(x * defaultPlayerVelocity, y * defaultPlayerVelocity);
    };
    const moveExecutions = {
      right: (): void => {
        handlePlayerWalk(1, 0, false);
      },
      left: (): void => {
        handlePlayerWalk(-1, 0, true);
      },
      up: (): void => {
        handlePlayerWalk(0, -1);
      },
      down: (): void => {
        handlePlayerWalk(0, 1);
      },
      attack: (): void => {
        if(!this.player.gameObject.isAttacking) {
          this.player.gameObject.isAttacking = true;
          this.player.gameObject.anims.play(playerSpriteKeys.attack, true);
          new Bullet(this.player, this.scene);
        }
      }
    }

    return moveExecutions[movement]();
  };
}
