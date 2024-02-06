import * as Phaser from 'phaser';
import { Player } from './entities/Player';
import { createControls, configControls } from './controls';
import { loadBulletSprites } from './entities/Bullet'
import { loadSlimeSprites, createSlime, changeSlimeDirection, Slime } from './entities/Slime';

export default class Game extends Phaser.Scene {
  player: Player;
  slime:  Slime;
  controls: Phaser.Types.Input.Keyboard.CursorKeys;
  water: Phaser.Tilemaps.TilemapLayer;
  bullets = [];

  constructor ()
  {
    super('game');
  }

  preload ()
  {
    this.loadMapAssets();
    this.loadSprites();
  }
  
  create ()
  {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    this.water = map.createLayer('water', tilesetWater, 0, 0);

    this.water.setCollisionByProperty({ collider: true});

    this.player = new Player(this, 200, 200);
    this.physics.add.overlap(this.player.sprite, this.water);
    
    this.player.sprite.anims.play("player_idle", true);
    
    this.controls = createControls(this);
    
    this.slime = createSlime(this);
    // createSlime(this);
    this.physics.add.collider(this.player.sprite, this.slime, this.handlePlayerSlimeCollision);

    this.physics.add.collider(this.slime, this.water);

    this.time.addEvent({
      delay: 2000, // intervalo em milissegundos para mudar a direção (2 segundos neste exemplo)
      loop: true,
      callback: changeSlimeDirection(this.slime),
      callbackScope: this.slime,
    });
  }

  update() {
    configControls(this.player, this.controls, this);
  }

  handlePlayerSlimeCollision(slime, player) {
    console.log('encostou');
    // slime.setVelocityX(0);
    // slime.setVelocityY(0);
    // slime.destroy()
  }
  loadSprites() {
    Player.loadSprites(this);
    loadBulletSprites(this);
    loadSlimeSprites(this);
  }
  loadMapAssets() {
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
  }
}

const config = {
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 640,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    }
  }
};

const game = new Phaser.Game(config);
