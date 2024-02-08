import * as Phaser from 'phaser';

export default class GameOverState extends Phaser.Scene {
  private score: number;
  private highScore: number;

  constructor() {
    super('game-over');
  }

  init(data: { score: number }) {
    this.score = data.score;
    const highScoreCache: number = this.cache.text.get('highScore');
    
    if(!highScoreCache || this.score > highScoreCache) {
      this.cache.text.add('highScore', this.score);
      this.highScore = this.score;
    } else {
      this.highScore = highScoreCache;
    }
  }

  create() {
    this.add.text(16, 16, `Pontos: ${this.score}`, { fontSize: '32px', color: '#fff' });
    this.add.text(16, 64, `Recorde: ${this.highScore}`, { fontSize: '32px', color: '#fff' });

    const newGameButton = this.add.text(16, 120, 'Novo jogo', { fontSize: '32px', color: '#fff' });
    // const exitButton = this.add.text(16, 160, 'Exit', { fontSize: '32px', color: '#fff' });

    newGameButton.setInteractive().on('pointerdown', () => {
      this.scene.start('main');
    });

    // exitButton.setInteractive().on('pointerdown', () => {
    //   this.scene.start('boot');
    // });
  }
}
