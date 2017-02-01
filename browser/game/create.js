import Player from './entities/players.js';
import Monster from './entities/monsters.js';
import Bullets from './entities/bullets.js';
import Wall from './entities/mapObjects.js';
import socket from '../socket';


var player;
var walls;
var cursors;
var wasd;
var fireRate = 400;
var monsterRate = 1000;
var button;
var bullets;
let id = 0;

var teamBullet;
let teammates = {} //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval
let map, layer, topOver, bottomOver, fringe, collideLayer;
 //TODO: on the backend .on('connection'), populate this with existing players instead of waiting for the first interval

export default function create() {

    //temporary for testing purposes
    //this settings

    this.world.setBounds(-1000, -1000, 2000, 2000);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');


    // map
    map = this.add.tilemap('tilemap');
    map.addTilesetImage('terrain_atlas', 'tileset')
    layer = map.createLayer('Bottom');
    collideLayer = map.createLayer('landscapeCollision')


    layer.resizeWorld();
    map.setCollisionBetween(1,2000, true, 'landscapeCollision')

    //walls
    // walls = new Wall(this);

    //player
    bottomOver = map.createLayer('bottomOver');
    topOver = map.createLayer('topOver')


    //player
    player = new Player(socket.id, this);


    fringe = map.createLayer('fringe');
    //monster
    // monster = new Monster(id, this);

    //bullets
    bullets = new Bullets(this);

    teamBullet = new Bullets(this);

    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);

}

export {player, walls, cursors, wasd, fireRate, monsterRate, bullets, teammates, teamBullet, collideLayer};