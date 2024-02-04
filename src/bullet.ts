import { Player } from './player';

export const loadBulletSprites = (scene: Phaser.Scene) => {
  scene.load.image("bullet", "./assets/bullet.png");
}

export const createBullet = (player: Player, scene: Phaser.Scene) => {
  const x = player.flipX ? player.x - 40 : player.x + 40;
  const y = player.y - 18;

  const bullet = scene.physics.add.image(x, y, "bullet").setScale(0.1)

  if(player.flipX) {
    bullet.setVelocityX(-700)
    bullet.setFlipX(true);
  } else {
    bullet.setVelocityX(700)
  }
}