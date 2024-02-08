import * as Phaser from 'phaser';

interface Data {
  score: number;
}
export default class GameOverState extends Phaser.Scene {
  private score: number;
  private highScore: number;

  constructor() {
    super('game-over');
  }

  init(data: Data) {
    this.score = data.score;
    this.setCache();
  }

  create() {
    let width = Number(this.sys.game.config.width);
    let height = Number(this.sys.game.config.height);

    const gameOverTitle = this.add.text(width / 2, height / 4, 'Fim de Jogo!', {
      fontSize: '46px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);

    const scoreText = this.add.text(width / 2, height / 2 - 50, `Pontuação: ${this.score}`, {
      fontSize: '24px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);

    const highscoreText = this.add.text(width / 2, height / 2, `Recorde: ${this.highScore}`, {
      fontSize: '24px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);

    const newGameButton = this.add.text(width / 2, height / 2 + 50, 'Novo Jogo', {
      fontSize: '24px',
      color: '#000000',
      backgroundColor: '#ddd',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    }).setOrigin(0.5).setInteractive();

    newGameButton.on('pointerover', () => {
      newGameButton.setStyle({
        backgroundColor: '#888',
      });
    });
    newGameButton.on('pointerout', () => {
      newGameButton.setStyle({
        backgroundColor: '#ddd',
      });
    });
    
    newGameButton.on('pointerdown', () => {
      this.scene.start('main');
    });
  }

  private setCache() {
    const highScoreCache: number = this.cache.text.get('highScore');
    
    if(!highScoreCache || this.score > highScoreCache) {
      this.cache.text.add('highScore', this.score);
      this.highScore = this.score;
    } else {
      this.highScore = highScoreCache;
    }
  }
}
