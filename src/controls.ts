import { Player } from './entities/Player';
import { createBullet } from './entities/Bullet';

export const createControls = (
  scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys => {
  return scene.input.keyboard.createCursorKeys();
};
export const configControls = (
  player: Player,
  controls: Phaser.Types.Input.Keyboard.CursorKeys,
  scene: Phaser.Scene
): void => {
  player.sprite.setVelocityX(0);
  player.sprite.setVelocityY(0);

  if (player.sprite.isAttacking) {
    return
  }

  if (controls.right.isDown) {
    moveRight(player);
    return;
  }
  if (controls.left.isDown) {
    moveLeft(player);
    return;
  }
  if (controls.up.isDown) {
    moveUp(player);
    return;
  }
  if (controls.down.isDown) {
    moveDown(player);
    return;
  }
  if (controls.space.isDown) {
    if(!player.sprite.isAttacking) {
      attack(player, scene);
    }
    return;
  }
  player.sprite.anims.play("player_idle", true);
};

const defaultVelocity = 200;
const moveRight = (player: Player): void => {
  player.sprite.setFlipX(false);
  player.sprite.anims.play('player_walk', true);
  player.sprite.setVelocityX(defaultVelocity);
};

const moveLeft = (player: Player): void => {
  player.sprite.setFlipX(true);
  player.sprite.anims.play('player_walk', true);
  player.sprite.setVelocityX(-defaultVelocity);
};

const moveUp = (player: Player): void => {
  player.sprite.anims.play('player_walk', true);
  player.sprite.setVelocityY(-defaultVelocity);
};

const moveDown = (player: Player): void => {
  player.sprite.anims.play('player_walk', true);
  player.sprite.setVelocityY(defaultVelocity);
};

const attack = (player: Player, scene: Phaser.Scene): void => {
  player.sprite.isAttacking = true;
  player.sprite.anims.play('player_attack', true);
  createBullet(player, scene);
};

