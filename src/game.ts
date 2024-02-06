import * as Phaser from 'phaser';
import { createPlayer, loadPlayerSprites, Player } from './player';
import { createControls, configControls } from './controls';
import { loadBulletSprites } from './bullet'
import { loadSlimeSprites, createSlime, changeSlimeDirection, Slime } from './slime';

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
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');

    loadPlayerSprites(this);
    loadBulletSprites(this);
    loadSlimeSprites(this);
  }
  
  create ()
  {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    this.water = map.createLayer('water', tilesetWater, 0, 0);

    this.water.setCollisionByProperty({ collider: true});

    this.player = createPlayer(this);
    this.physics.add.overlap(this.player, this.water);
    
    this.player.anims.play("player_idle", true);
    
    this.controls = createControls(this);
    
    this.slime = createSlime(this);
    // createSlime(this);
    this.physics.add.collider(this.player, this.slime, this.handlePlayerSlimeCollision);

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
