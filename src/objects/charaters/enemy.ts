import Phaser from 'phaser';
import GroupManager from '../../managers/groupManager';
import Group from '../group';
import CollisionZone from '../collisionZone';
import {
  CollisionZonesGroupType,
  EnemyMode,
  EnemyType,
  ImageTexture,
} from '../../enum';
import {
  collisionElementConfig,
  healthConfig,
  scaleConfig,
  speedConfig,
} from '../../config';

export default class Enemy extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private _type: EnemyType;
  private health: number;
  public mode: EnemyMode;
  public collisionZones!: Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    enemyType: EnemyType,
    groupManager: GroupManager
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = enemyType;
    this.speed = speedConfig[enemyType];
    this._type = enemyType;
    this.health = healthConfig[enemyType];
    this.mode = EnemyMode.NORMAL;

    const collisionZonesGroup = {
      [EnemyType.ULTRON1]: CollisionZonesGroupType.ULTRON1,
      [EnemyType.ULTRON2]: CollisionZonesGroupType.ULTRON2,
      [EnemyType.ULTRON3]: CollisionZonesGroupType.ULTRON3,
      [EnemyType.ROCK]: CollisionZonesGroupType.ROCK,
    };
    this.collisionZones = groupManager.getCollisionZones(
      collisionZonesGroup[enemyType]
    );

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.height * scaleConfig[enemyType]) / this.height;
    this.setScale(scale);

    this.createCollisionZones();
  }

  public getType() {
    return this._type;
  }

  public getSpeed() {
    return this.speed;
  }

  public getHealth() {
    return this.health;
  }

  public decreaseHealth(damage: number) {
    // 체력 감소
    this.health -= damage;

    // 체력 소진 여부 반환
    return this.health <= 0;
  }

  // 충격 감지 영역 생성
  public createCollisionZones() {
    // 기존 충격 감지 영역 제거
    this.collisionZones.clear(true, true);

    const elements = collisionElementConfig.enemies[this._type][this.mode];

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        0,
        0,
        // ImageTexture.COLLISION_ZONE
      )
        .setSize(this.displayWidth * (w / 100), this.displayHeight * (h / 100))
        // .setOffset(0, 0);
        
      collisionZone.who = this._type
      
      this.collisionZones.add(collisionZone);
      this.collisionZones.updateCollisionParent(this)
    });
  }
}
