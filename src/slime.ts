import * as Phaser from 'phaser';

export const loadSlimeSprites = (scene: Phaser.Scene): void => {
  scene.load.spritesheet('slime_idle', './assets/slime/idle.png', {
    frameWidth: 20,
    frameHeight: 17,
    spacing: 0
  });
};

export const createSlimeAnimations = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: 'slime_idle',
    frames: scene.anims.generateFrameNames('slime_idle', {
      start: 0,
      end: 6
    }),
    frameRate: 8,
    repeat: -1,

  });
}

export const createSlime = (scene: Phaser.Scene) => {
  createSlimeAnimations(scene);
  const slime = scene.physics.add.sprite(400, 200, "slime_idle").setScale(2);
  slime.anims.play("slime_idle", true);
  return slime;
}

export const changeSlimeDirection = (slime) => {
  return () => {
    const speed = 50;
    const direction = Phaser.Math.RND.pick([-1, 1]);
    const velocity = speed * direction
    const horizontalOrVertical = Phaser.Math.RND.pick(['X', 'Y']);
  
    if(horizontalOrVertical === 'X') {
      slime.setVelocityX(velocity);
      slime.setVelocityY(0);
    } else {
      slime.setVelocityX(0);
      slime.setVelocityY(velocity);
    }
  }
}