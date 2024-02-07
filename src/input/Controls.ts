import { Player, Bullet } from '../entities';
import { defaultPlayerVelocity, playerSpriteKeys } from '../utils/consts';

type Movement = 'up' | 'down' | 'left' | 'right' | 'attack';

export class Controls {
  private scene: Phaser.Scene;
  private player: Player;
  private controls: Phaser.Types.Input.Keyboard.CursorKeys
  
  constructor(scene: Phaser.Scene, player: Player) {
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

// export const configControls = (
//   player: Player,
//   controls: Phaser.Types.Input.Keyboard.CursorKeys,
//   scene: Phaser.Scene
// ): void => {
//   player.gameObject.setVelocityX(0);
//   player.gameObject.setVelocityY(0);

//   ;
// };

// const moveRight = (player: Player): void => {
//   player.gameObject.setFlipX(false);
//   player.gameObject.anims.play('player_walk', true);
//   player.gameObject.setVelocityX(defaultPlayerVelocity);
// };

// const moveLeft = (player: Player): void => {
//   player.gameObject.setFlipX(true);
//   player.gameObject.anims.play('player_walk', true);
//   player.gameObject.setVelocityX(-defaultPlayerVelocity);
// };

// const moveUp = (player: Player): void => {
//   player.gameObject.anims.play('player_walk', true);
//   player.gameObject.setVelocityY(-defaultPlayerVelocity);
// };

// const moveDown = (player: Player): void => {
//   player.gameObject.anims.play('player_walk', true);
//   player.gameObject.setVelocityY(defaultPlayerVelocity);
// };

// const attack = (player: Player, scene: Phaser.Scene): void => {
//   player.gameObject.isAttacking = true;
//   player.gameObject.anims.play('player_attack', true);
//   new Bullet(player, scene);
// };

