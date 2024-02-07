import * as Phaser from 'phaser';
import { Player, Bullet, Slime } from '../entities';
import { Controls } from '../input/Controls';
import { playerSpriteKeys } from '../utils/consts';

export default class MainScene extends Phaser.Scene {
  player: Player;
  slimes:  Slime[] = [];
  controls: Controls;
  water: Phaser.Tilemaps.TilemapLayer;
  bullets: Bullet[] = [];
  points: number = 0;

  constructor() {
    super('main-scene');
  }

  preload() {
    this.loadMapAssets();
    this.loadSprites();
  }
  create() {
    this.createMap();
    Slime.createAnimations(this)

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

  handlePlayerSlimeCollision(slime: Slime, player: Player) {
    console.log('encostou');
    slime.gameObject.setVelocity(0, 0);
    // slime.gameObject.stop()
    // slime.setVelocityX(0);
    // slime.setVelocityY(0);
    // slime.destroy()
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
