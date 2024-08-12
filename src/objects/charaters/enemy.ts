import Phaser from 'phaser';
import CollisionZoneGroup from '../dynamics/collisionZoneGroup';
import CollisionZone from '../dynamics/collisionZone';
import { EnemyMode, EnemyType } from '../../enum';
import {
  collisionElementConfig,
  healthConfig,
  scaleConfig,
  speedConfig,
} from '../../config';

export default class Enemy extends Phaser.GameObjects.Image {
  private speed: number;
  private _type: EnemyType;
  private health: number;
  public mode: EnemyMode;
  public collisionZones!: CollisionZoneGroup;
  public colliderHandlers: Phaser.Physics.Arcade.Collider[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    enemyType: EnemyType
  ) {
    super(scene, x, y, texture);

    // 설정
    this.name = enemyType;
    this.speed = speedConfig[enemyType];
    this._type = enemyType;
    this.health = healthConfig[enemyType];
    this.mode = EnemyMode.NORMAL;

    // sprite 추가
    scene.add.existing(this);

    const scale =
      (scene.game.canvas.width * scaleConfig[enemyType]) / this.width;
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

  // 충돌 감지 영역 생성
  public createCollisionZones() {
    // 충돌 감지 영역 생성
    this.collisionZones = new CollisionZoneGroup(this.scene, {
      classType: CollisionZone,
      runChildUpdate: true,
    });

    const elements = collisionElementConfig.enemies[this._type][this.mode];

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        this.displayWidth * (w / 100),
        this.displayHeight * (h / 100)
      );

      this.collisionZones.add(collisionZone);
    });
  }

  // 충돌 감지 영역 업데이트
  public updateCollisionZones() {
    // 기존 충돌 감지 영역 제거
    this.collisionZones.clear(true, true);

    const elements = collisionElementConfig.enemies[this._type][this.mode];

    elements.forEach(({ x, y, w, h }) => {
      const collisionZone = new CollisionZone(
        this.scene,
        this.x + this.displayWidth * (x / 100),
        this.y + this.displayHeight * (y / 100),
        this.displayWidth * (w / 100),
        this.displayHeight * (h / 100)
      );

      this.collisionZones.add(collisionZone);
    });
  }
}
