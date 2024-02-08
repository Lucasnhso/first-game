import * as Phaser from 'phaser';
import MainScene from "./scenes/MainScene";
import GameOverState from './states/GameOver';

const config = {
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 640,
  scene: [MainScene, GameOverState],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    }
  }
};

new Phaser.Game(config);
