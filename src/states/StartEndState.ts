import * as Phaser from 'phaser';

export interface GameOverStateData {
  score: number;
  isGameOver: boolean;
}
export default class StartState extends Phaser.Scene {
  private score: number;
  private highScore: number;
  private screenHeight: number;
  private screenWidth: number;
  private isGameOver: boolean;

  constructor() {
    super('start_end_state');
  }
  
  init({ score }: GameOverStateData) {
    this.score = score;
    this.setCache();
  }
  
  create({ isGameOver }: GameOverStateData) {
    this.isGameOver = isGameOver;
    this.screenHeight = Number(this.sys.game.config.height);
    this.screenWidth = Number(this.sys.game.config.width);

    this.createScreenElements();
  }
  private createScreenElements() {
    this.createTitle()

    if(this.isGameOver) {
      const scoreText = this.add.text(this.screenWidth / 2, this.screenHeight / 2 - 50, `Pontuação: ${this.score}`, {
        fontSize: '24px',
        color: '#fff',
        align: 'center',
      }).setOrigin(0.5);
  
      const highscoreText = this.add.text(this.screenWidth / 2, this.screenHeight / 2, `Recorde: ${this.highScore}`, {
        fontSize: '24px',
        color: '#fff',
        align: 'center',
      }).setOrigin(0.5);
    }
    this.createNewGameButton()
  }

  private createTitle() {
    const label = this.isGameOver ? 'Fim de Jogo' : 'Bem Vindo!';
    const title = this.add.text(this.screenWidth / 2, this.screenHeight / 4, label, {
      fontSize: '46px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);
  }
  private createNewGameButton() {
    const newGameButton = this.add.text(this.screenWidth / 2, this.screenHeight / 2 + 50, 'Novo Jogo', {
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
