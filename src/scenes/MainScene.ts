import * as Phaser from 'phaser';
import { Player, Bullet, Slime } from '../entities';
import { Controls } from '../input/Controls';

export default class MainScene extends Phaser.Scene {
  player: Player;
  slimes:  Slime[] = [];
  controls: Controls;
  water: Phaser.Tilemaps.TilemapLayer;
  bullets: Bullet[] = [];
  score: number = 0;
  private scoreText: Phaser.GameObjects.Text

  constructor() {
    super('main');
  }

  preload() {
    this.loadMapAssets();
    this.loadSprites();
  }
  create() {
    this.createMap();
    Slime.createAnimations(this)
    this.scoreText = this.add.text(10, 5, 'Pontos: 0', {
      fontSize: '16px',
      color: '#fff'
    });
    
    this.player = new Player(this);
    this.physics.add.collider(this.player.gameObject, this.water);
    
    this.controls = new Controls(this, this.player);
    this.slimes.push(new Slime(this))
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {this.slimes.push(new Slime(this))},
    });
    
  }

  update() {
    this.controls.config();
  }
  gainScore() {
    this.score ++
    this.updateScoreText()
  }
  updateScoreText() {
    this.scoreText.setText(`Pontos: ${this.score}`);
  }
  private loadSprites() {
    Player.loadSprites(this);
    Bullet.loadSprites(this);
    Slime.loadSprites(this);
  }
  private loadMapAssets() {
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
  }
  private createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    this.water = map.createLayer('water', tilesetWater, 0, 0);

    this.water.setCollisionByProperty({ collider: true});
  }
}
