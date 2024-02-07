import * as Phaser from 'phaser';
import { Player, Bullet, Slime } from '../entities';
import { Controls } from '../input/Controls';

export default class MainScene extends Phaser.Scene {
  player: Player;
  slime:  Slime;
  controls: Controls;
  water: Phaser.Tilemaps.TilemapLayer;
  bullets = [];

  constructor() {
    super('main-scene');
  }

  preload() {
    this.loadMapAssets();
    this.loadSprites();
  }
  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    this.water = map.createLayer('water', tilesetWater, 0, 0);

    this.water.setCollisionByProperty({ collider: true});

    this.player = new Player(this, 200, 200);
    this.physics.add.overlap(this.player.gameObject, this.water);
    
    this.player.gameObject.anims.play("player_idle", true);
    
    this.controls = new Controls(this, this.player);
    
    this.slime = new Slime(this, 400, 200);
    
    this.physics.add.collider(this.player.gameObject, this.slime.gameObject, this.handlePlayerSlimeCollision);

    this.physics.add.collider(this.slime.gameObject, this.water);
  }

  update() {
    this.controls.config();
  }

  handlePlayerSlimeCollision(slime, player) {
    console.log('encostou');
    // slime.setVelocityX(0);
    // slime.setVelocityY(0);
    // slime.destroy()
  }
  loadSprites() {
    Player.loadSprites(this);
    Bullet.loadSprites(this);
    Slime.loadSprites(this);
  }
  loadMapAssets() {
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
  }
}
