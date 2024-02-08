import * as Phaser from 'phaser';

export interface StartEndData {
  score: number;
  isGameOver: boolean;
}
export default class StartEndState extends Phaser.Scene {
  private score: number;
  private highScore: number;
  private screenHeight: number;
  private screenWidth: number;
  private isGameOver: boolean;

  constructor() {
    super('start_end_state');
  }
  
  init({ score }: StartEndData) {
    this.score = score;
    this.setCache();
  }
  
  create({ isGameOver }: StartEndData) {
    this.isGameOver = isGameOver;
    this.screenHeight = Number(this.sys.game.config.height);
    this.screenWidth = Number(this.sys.game.config.width);

    this.createScreenElements();

    this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    this.input.keyboard.on('keydown-ENTER', this.startGame, this);
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
      this.startGame();
    });
  }
  private startGame() {
    this.scene.start('main');
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
