import * as Phaser from 'phaser';

export default class GameOverState extends Phaser.Scene {
  private score: number;
  private highScore: number;

  constructor() {
    super('game-over');
  }

  init(data: { score: number }) {
    this.score = data.score;
    this.highScore = 0;
  }

  create() {
    this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '32px', color: '#fff' });
    this.add.text(16, 64, `High Score: ${this.highScore}`, { fontSize: '32px', color: '#fff' });

    const newGameButton = this.add.text(16, 120, 'New Game', { fontSize: '32px', color: '#fff' });
    const exitButton = this.add.text(16, 160, 'Exit', { fontSize: '32px', color: '#fff' });

    newGameButton.setInteractive().on('pointerdown', () => {
      this.scene.start('main');
    });

    // exitButton.setInteractive().on('pointerdown', () => {
    //   this.scene.start('boot');
    // });
  }
}
