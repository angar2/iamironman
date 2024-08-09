import Phaser from 'phaser';
import GroupManager from '../../managers/groupManager';
import Group from '../group';
import CollisionZone from '../collisionZone';
import { EnemyType, GroupType, ImageTexture } from '../../enum';
import { collisionElementConfig, healthConfig, scaleConfig, speedConfig } from '../../config';

export default class Enemy extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private _type: EnemyType;
  private health: number;
  public collisionZones!: Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    enemyType: EnemyType,
    groupManager: GroupManager,
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = enemyType;
    this.speed = speedConfig[enemyType];
    this._type = enemyType;
    this.health = healthConfig[enemyType];
    this.collisionZones = groupManager.get(GroupType.COLLISION_ZONES);

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.height * scaleConfig[enemyType]) / this.height;
    this.setScale(scale);
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

  // 충격 감지 센서 생성
  // public createCollisionZones() {
  //   // 기존 충격 감지 센서 제거
  //   this.collisionZones.clear(true, true);

  //   const elements = collisionElementConfig.enemies[this.enemyType][this.enemyMype];

  //   elements.forEach(({ x, y, w, h }) => {
  //     const collisionZone = new CollisionZone(
  //       this.scene,
  //       this.x + this.displayWidth * (x / 100),
  //       this.y + this.displayHeight * (y / 100),
  //       ImageTexture.COLLISION_ZONE
  //     )
  //       .setSize(this.displayWidth * (w / 100), this.displayHeight * (h / 100))
  //       .setOffset(0, 0);

  //     this.collisionZones.add(collisionZone);
  //   });
  // }
}
