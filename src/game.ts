import * as Phaser from 'phaser';
import MainScene from "./scenes/MainScene";
import StartEndState from './states/StartEndState';

const config = {
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 640,
  scene: [ StartEndState, MainScene ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    }
  }
};

new Phaser.Game(config);
