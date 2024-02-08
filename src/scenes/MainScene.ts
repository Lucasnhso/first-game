import * as Phaser from 'phaser';
import { Player, Bullet, Slime } from '../entities';
import { Controls } from '../input/Controls';
import { defaultSlimeSpawnInterval } from '../utils/consts';

export default class MainScene extends Phaser.Scene {
  player: Player;
  slimes:  Slime[] = [];
  controls: Controls;
  water: Phaser.Tilemaps.TilemapLayer;
  bullets: Bullet[] = [];
  private difficulty: number;
  private slimeSpawnEvent: Phaser.Time.TimerEvent
  score: number;
  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super('main');
  }

  init() {
    this.score = 0;
    this.difficulty = 1;
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
    const highScoreCache: number = this.cache.text.get('highScore') || 0;
    this.add.text(150, 5, `Recorde: ${ highScoreCache }`, {
      fontSize: '16px',
      color: '#fff'
    });
    
    this.player = new Player(this);
    this.physics.add.collider(this.player.gameObject, this.water);
    
    this.controls = new Controls(this, this.player);
    this.slimes.push(new Slime(this))

    this.slimeSpawnEvent = this.time.addEvent({
      delay: defaultSlimeSpawnInterval,
      loop: false,
      callback: this.spawnSlime,
    });
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        this.difficulty += 0.1;
      },
    });
  }

  update() {
    this.controls.config();
  }
  private spawnSlime = (): void => {
    this.createSlime();
    this.slimeSpawnEvent.reset({
      delay: defaultSlimeSpawnInterval / this.difficulty,
      callback: this.spawnSlime,
      callbackScope: this,
      loop: false,
    });
  }
  private createSlime(): void {
    this.slimes.push(new Slime(this));
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
